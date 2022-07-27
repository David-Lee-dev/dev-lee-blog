FROM python:3.9.6

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN apt update
RUN apt upgrade
RUN apt-get install -y python3-dev libmysqlclient-dev mysql-client-8.0
RUN python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000