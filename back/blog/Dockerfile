FROM ubuntu:20.04
FROM python:3.9.6

WORKDIR /app

RUN apt update
RUN apt upgrade -y
RUN apt-get install -y python3-dev libmysqlclient-dev mysql-client-8.0

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000