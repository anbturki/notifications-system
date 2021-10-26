# Pangaea Take-home assignment

## Run services

Change permisson

```sh
$ chmod +x ./start-server.sh
```

Run services

```sh
$ ./start-server.sh
```

## End points

### Broker

| Method | Uri          | Payload                           | Response                                             |
| ------ | ------------ | --------------------------------- | ---------------------------------------------------- |
| POST   | `/subscribe` | `{"url":"http://localhost:9000"}` | `{"url": "http://localhost:9001","topic": "topic2"}` |
| POST | `/publish/[topic]` |`{"message":"hello world"}` | `{ "message": "Sent to 2 out of 2 subscribers.", "details": [ { "sent": true, "payload": { "name": "ali", "message": "hi" }, "topic": "topic2", "url": "http://localhost:9000" }, { "sent": true, "payload": { "name": "ali", "message": "hi" }, "topic": "topic2", "url": "http://localhost:9001" } ] }`

### Subscriber

| Method | Uri       | Payload                                                | Response                                              |
| ------ | --------- | ------------------------------------------------------ | ----------------------------------------------------- |
| POST   | `/`       | `{ "topic":"test1", data: {"message":"hello world"} }` | `{"topic":"test1", data: {"message":"hello world"}}`  |
| GET    | `/health` | NULL                                                   | `{"online": true,"date": "Tue Oct 26 2021 22:02:58"}` |

## Scripts

---

| Command        | Description                      |
| -------------- | -------------------------------- |
| build          | convert Typescript to Javascript |
| start          | start transpiled services        |
| prettier:write | overrite files with formatting   |
| prettier:check | check formats                    |

### Full example as per the assignment document

```sh
./start-server.sh
curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test1"}' http://localhost:8000/subscribe/topic1 curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test2"}' http://localhost:8000/subscribe/topic1 curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:8000/publish/topic1
```
