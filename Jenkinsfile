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
                        docker.build("api-test:${env.BUILD_ID}", "-f ./Dockerfile.build .")
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
                sh "docker run api-test:${env.BUILD_ID}"
            }
            post {
                failure {
                    echo 'Tests failed. See logs for details.'
                }
            }        
        }
    }
    post {
        always {
           sh "docker rmi -f api-test:${env.BUILD_ID}" 
        }
    }
}
