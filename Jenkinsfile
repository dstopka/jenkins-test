pipeline {
  agent any
  stages {
    stage('BUILD') {
      steps {
        sh 'docker build -t aspnetcoreapp .'
      }
      post {
        failure {
            echo 'This build has failed. See logs for details.'
        }
      }
    }
    stage('DEPLOY') {
      steps {
        sh docker-compose up
      }
    }
  }
}
