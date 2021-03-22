pipeline {
  agent any
  stages {
    stage('BUILD') {
      steps {
        sh 'docker build --rm -t aspnetcoreapp -f ./WebApiTest/Dockerfile .'
        sh 'docker build --rm -t frontendapp -f ./ClientApp/Dockerfile .'
      }
      post {
        failure {
            echo 'This build has failed. See logs for details.'
        }
      }
    }
    stage('DEPLOY') {
      steps {
        sh 'docker stop myapp || true && docker rm -f myapp || true'
        sh 'docker stop myapp_frontend || true && docker rm -f myapp_frontend || true'
        sh 'docker stop myapp_mongo || true && docker rm -f myapp_mongo || true'
        sh 'docker stop myapp_mongo_express || true && docker rm -f myapp_mongo_express || true'
        sh 'docker-compose -d up'
      }
    }
  }
}
