#include <winsock2.h>
#include <windows.h>
#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/strand.hpp>
#include <iostream>
#include <memory>
#include <string>
#include <thread>
/*
* Hello im trying to d
*
*
* */
#ifdef _WIN32
#include <windows.h>
#define gettid() GetCurrentThreadId()
#else
#include <unistd.h>
#include <sys/syscall.h>
#define gettid() (syscall(SYS_gettid))
#endif

namespace beast = boost::beast;
namespace http = beast::http;
namespace websocket = beast::websocket;
namespace net = boost::asio;
using tcp = boost::asio::ip::tcp;

class EchoWebSocket : public std::enable_shared_from_this<EchoWebSocket> {
    websocket::stream<beast::tcp_stream> ws;
    beast::flat_buffer buffer;

public:
    EchoWebSocket(tcp::socket&& socket) : ws(std::move(socket)) {}
    void run() {
        ws.async_accept([self{shared_from_this()}](beast::error_code ec) {
            if (ec) std::cout << ec.message() << '\n';

            self->echo();
        });
    }

    void echo() {
        ws.async_read(buffer, [self{shared_from_this()}](beast::error_code ec,
                                                                  std::size_t bytes_transferred) {
            std::cout<<"thread id"<<gettid()<<'\n';
            if (ec == websocket::error::closed) return;
            if (ec) std::cout << ec.message() << '\n';

            auto out = beast::buffers_to_string(self->buffer.cdata());
            std::cout << out << std::endl;

            self->ws.async_write(self->buffer.data(), [self](beast::error_code ec,
                                                                      std::size_t bytes_transferred) {
               if(ec) std::cout << ec.message() << '\n';
                self->buffer.consume(bytes_transferred);
                self->echo();
            });
        });
    }
};

class Listener : public std::enable_shared_from_this<Listener> {

    net::io_context& ioc;
    tcp::acceptor acceptor;

public:
    Listener(net::io_context& ioc,
        unsigned short int port):ioc(ioc),
        acceptor(net::make_strand(ioc),{net::ip::make_address("127.0.0.1"),port}){}
    void async_accept() {
        acceptor.async_accept(net::make_strand(ioc), [self{shared_from_this()}](boost::system::error_code ec, tcp::socket socket) {
            if (ec) std::cout << ec.message() << '\n';
            std::cout<<"connection Accepted"<<std::endl;
            std::make_shared<EchoWebSocket>(std::move(socket))->run();
            self->async_accept();
        });
    }
};

int main() {

    auto const port = 8083;
    int threads = 4;
    net::io_context ioc{threads};
    std::make_shared<Listener>(ioc, port)->async_accept();

    std::vector<std::thread> threads_v;
    threads_v.reserve(threads);
    for (int i = 0; i < threads; ++i) {
        threads_v.emplace_back([&ioc]() {
            ioc.run();
        });
    }

    for (auto& thread : threads_v) {
        thread.join();
    }

    return 0;
}
