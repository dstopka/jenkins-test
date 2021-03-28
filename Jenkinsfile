pipeline {
    environment {
      apiImage = ''
    }
    agent any
    stages {
        stage('Build') {
            parallel {
                stage('Build API') {
                    steps {
                        dir('WebApiTest') {
                            script {
                                docker.build("api-test", "-f ./Dockerfile.build .")
                            }
                        }
                    }
                    post {
                        failure {
                            echo('Building API failed. See logs for more details.')
                        }
                    }
                }
                stage('Build UI') {
                    steps {
                        dir('ClientApp') {
                            script {
                                docker.build("ui-test", "-f ./Dockerfile .")
                            }
                        }
                    }
                    post {
                        failure {
                            echo('Building UI failed. See logs for more details.')
                        }
                    }
                }
            }
        }
        stage('Test') {
            steps {
                sh "docker run api-test"
            }
            post {
                failure {
                    echo 'API tests failed. See logs for details.'
                }
            }        
        }
        stage('Deploy') {
            when {
                expression {
                    return "${env.ghprbTargetBranch}" == "develop"
                }
            }
            steps {
                sh 'docker-compose -f ./docker-compose-mongo.yaml down || true'
                sh 'docker-compose -f ./docker-compose.yaml down || true'
                sh 'docker-compose -f ./docker-compose-mongo.yaml -f ./docker-compose.yaml up -d --build'
            }
        }
    }
    post {
        always {
           sh 'docker system prune -f'
        }
    }
}
