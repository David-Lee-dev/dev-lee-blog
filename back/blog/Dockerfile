FROM python:3.9.6

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

COPY . .

CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000