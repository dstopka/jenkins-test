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
        sh 'docker-compose -f ./docker-compose.yaml down || true'
        sh 'docker-compose -f ./docker-compose-mongo.yaml down || true'
        sh 'docker-compose -f ./docker-compose-mongo.yaml -f ./docker-compose.yaml up -d'
      }
    }
  }
}
