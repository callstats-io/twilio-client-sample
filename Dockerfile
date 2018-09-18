FROM python:2.7

WORKDIR /code

ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

RUN apt-get update && \
    apt-get install -y curl git && \
    curl -sL https://deb.nodesource.com/setup_8.x | /bin/bash - && \
    apt-get install -y nodejs build-essential && \
    apt-get purge -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package.json /code
RUN npm install --silent

ADD . /code

CMD ["python","run.py"]