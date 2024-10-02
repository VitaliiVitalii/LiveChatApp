cmake_minimum_required(VERSION 3.29)
project(websocket_server)

set(CMAKE_CXX_STANDARD 20)

add_compile_options(-Wa,-mbig-obj -fno-inline-functions -O2)

set(BOOST_ROOT "E:/boost_1_86_0")
set(BOOST_INCLUDEDIR "E:/boost_1_86_0")
set(BOOST_LIBRARYDIR "E:/boost_1_86_0/libs")

find_package(Boost 1.70 REQUIRED)

if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
    add_executable(websocket_server main.cpp)
    target_link_libraries(websocket_server ${Boost_LIBRARIES} Ws2_32 Mswsock)
else()
    message(FATAL_ERROR "Boost not found!")
endif()