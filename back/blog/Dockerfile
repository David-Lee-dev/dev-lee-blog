FROM python:3.9.6

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN apt update
RUN apt upgrade
RUN apt-get install -y libmysqlclient-dev
RUN python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000