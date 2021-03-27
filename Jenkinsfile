pipeline {
  environment {
      apiImage = ''
  }
  agent any
  stages {
    stage('Build') {
        steps {
            dir('WebApiTest') {
                script {
                    apiImage = docker.build("api-test:${env.BUILD_ID}", "-f ./Dockerfile.build")
                }
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
    stage('Test') {
        steps {
            script {
                apiImage {
                    sh 'cd /app/Test'
                    sh 'docker test'
                }
            }
        }
        post {
            failure {
                echo 'Tests failed. See logs for details.'
            }
        }        
    }
  }
}
