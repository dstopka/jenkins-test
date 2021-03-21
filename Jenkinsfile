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
        sh 'docker stop myapp'
        sh 'docker rm -f myapp'
        sh 'docker stop myapp_frontend'
        sh 'docker rm -f myapp_frontend'
        sh 'docker-compose up'
      }
    }
  }
}
