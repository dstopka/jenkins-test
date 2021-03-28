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
                        docker.build("api-test", "-f ./Dockerfile.build .")
                    }
                }
                dir('ClientApp') {
                    sh 'docker build --rm -t frontendapp .'
                }
            }
            post {
                failure {
                    echo 'Build failed. See logs for details.'
                }
            }
        }
        stage('Test') {
            steps {
                sh "docker run api-test"
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
           sh "docker rmi -f $(docker images -f "dangling=true" -q)" 
        }
    }
}
