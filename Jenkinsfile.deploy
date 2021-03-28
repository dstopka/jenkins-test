pipeline {
  agent any
  stages {
    stage('BUILD') {
      steps {
        dir('WebApiTest') {
          sh 'docker build --rm -t aspnetcoreapp .'
        }
        dir('ClientApp') {
          sh 'docker build --rm -t frontendapp .'
        }
      }
      post {
        failure {
            echo 'This build has failed. See logs for details.'
        }
      }
    }
    stage('DEPLOY') {
      steps {
        sh 'docker-compose -f ./docker-compose-mongo.yaml down || true'
        sh 'docker-compose -f ./docker-compose.yaml down || true'
        sh 'docker-compose -f ./docker-compose-mongo.yaml -f ./docker-compose.yaml up -d'
      }
    }
  }
}
