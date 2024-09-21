pipeline {
    agent any
    
    environment {
        SERVERLESS_ACCESS_KEY = credentials('SERVERLESS_ACCESS_TOKEN')
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        Email_Address = 'pooyafo@gmail.com'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pooyafo/http-api.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Check required dependencies'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test'
                }
        }
        
        stage('Code Quality Analysis') {
            steps {
                echo 'Running SonarQube analysis'
                withSonarQubeEnv('SonarQubeServer') {
                    bat "${tool 'SonarQubeScanner'}/bin/sonar-scanner -Dsonar.sources=./"
                }
            }
        }

        stage('Deploy to Staging') {
            steps {               
                echo 'Deploy to Staging'
                bat 'serverless deploy'
            }
        }

        stage('Release') {
            steps {
                echo 'Deploy to Production'
                bat 'serverless deploy'
            }
        }
    }

    post {
        always {
            script {
                echo 'Task Completed!'
            }
        }

        success {
            emailext (
                subject: "'HTTP API Pipeline: ${currentBuild.currentResult}",
                body: "Pipeline completed Successfully! Get customers list from: 'https://2oo4cepod3.execute-api.ap-southeast-2.amazonaws.com/'",
                to: "${env.EMAIL_RECIPIENT}"
            )
        }

        failure {
            script {
                writeFile file: 'console-log.txt', text: currentBuild.rawBuild.getLog(100).join('\n')
            }
            emailext (
                subject: "HTTP API Pipeline: ${currentBuild.currentResult}",
                body: "Pipeline Failed! Check the attached log file.",
                attachmentsPattern: 'console-log.txt',
                to: "${env.EMAIL_RECIPIENT}"
            )
        }
    }
}
