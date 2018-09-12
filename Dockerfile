FROM node:8.9.4

COPY package.json /code
RUN npm install --silent

FROM python:2.7
ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
ADD . /code
WORKDIR /code


CMD ["python","run.py"]