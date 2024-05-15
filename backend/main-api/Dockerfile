FROM python:3.8

COPY requirements.txt .

RUN pip3 install \
    --no-cache-dir \
    --no-warn-script-location \
    -r requirements.txt

COPY app.py /
COPY blueprints /blueprints

ENTRYPOINT ["python3", "-u", "app.py"]
