# Lepet Project

## What has been implemented

This project is a messaging application built using Django and Django Rest Framework. The main features include:

- **User Registration and Authentication:** Users can register with their username, first name, last name, phone number, and email.
- **Profile Management:** Users can manage their profiles, including their profile pictures and bio.
- **User Online Status:** The application tracks whether users are online and their last active time.
- **API Endpoints:** RESTful API endpoints for user management, allowing for the creation, retrieval, update, and deletion of user accounts.
- **CORS Support:** The application supports cross-origin resource sharing (CORS) to allow requests from different domains.
  
## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lepet
2. Create a virtual environment:
    ```bash
   python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
3. Install the required packages:
   ```bash
   pip3 install -r requirements.txt
4. Set up your environment variables. Create a .env file in the project root and add the following variables:
    ```bash
    DATABASE_NAME=your_database_name
    DATABASE_PASSWORD=your_database_password
6. Apply migrations:
    ```bash
   python3 manage.py migrate
6. Create a superuser (optional):
    ```bash
   python3 manage.py createsuperuser
7. Run the server:
    ```bash
   python3 manage.py runserver
   

The application should now be running at http://127.0.0.1:8000/.