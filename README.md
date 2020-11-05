# Swagger Express Monitor

Este projeto foi criado para testar o uso de dois pacotes em conjunto:

- [express-monitor](https://www.npmjs.com/package/@labbsr0x/express-monitor)
- [swagger-express-middleware](https://www.npmjs.com/package/@apidevtools/swagger-express-middleware)

Foi identificada uma issue ao registrar a métrica **request_seconds_bucket** onde o label **addr** é registrado incorretamente:

```
# HELP request_seconds records in a histogram the number of http requests and their duration in seconds
# TYPE request_seconds histogram
request_seconds_bucket{le="0.01",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 0
request_seconds_bucket{le="0.05",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.1",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_bucket{le="0.5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_bucket{le="1",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_bucket{le="1.5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_bucket{le="5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_bucket{le="+Inf",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
request_seconds_sum{type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 0.104281
request_seconds_count{type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 2
```

Isto ocorre para todos os endpoints definidos no **Swagger Express Middlware**.

O mesmo não ocorre quando definido "manualmente" como no endpoint `/manual`:

```
# HELP request_seconds records in a histogram the number of http requests and their duration in seconds
# TYPE request_seconds histogram
request_seconds_bucket{le="0.01",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.05",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.1",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="1",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="1.5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="5",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="+Inf",type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_sum{type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 0.002844225
request_seconds_count{type="http",status="200",method="GET",addr="/^(?!\\/metrics$).*/",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.01",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.05",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.1",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="0.5",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="1",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="1.5",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="5",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_bucket{le="+Inf",type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
request_seconds_sum{type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 0.000509245
request_seconds_count{type="http",status="200",method="GET",addr="/manual",isError="false",errorMessage=""} 1
```
