# WebIDE
구름톤 트레이닝 풀스택 1회차 Web IDE

# 개발

## API 명세

이 프로젝트는 OpenAPI Specification으로 API가 명세되어 있습니다.

해당 스펙은 [github pages](https://nakaligoba.github.io/WebIDE/)로 Swagger UI를 적용하여 배포되어 있습니다.

해당 링크를 통해 API 명세를 확인할 수 있습니다.


## API Mock Server

이 프로젝트는 OpenAPI Specification으로 API가 명세되어 있습니다. 

따라서 OAS를 활용한 API Mocking이 가능합니다.

### 사용 방법

1. Prism 설치

```shell
npm install -g @stoplight/prism-cli

# OR

yarn global add @stoplight/prism-cli
```

🛠️ 주의 NodeJS 18.6 버전 이상이 필요합니다. [관련 이슈](https://github.com/stoplightio/prism/issues/2305)

2. Mocking

```shell
prism mock -p 8080 https://nakaligoba.github.io/WebIDE/output.yaml
```

http://localhost:8080으로 API Mock Server가 배포됩니다.
