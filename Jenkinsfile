def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

pipeline {
  agent {
    node {
      label 'amzlnx2'
    }
  }

  tools {
    nodejs 'nodejs-12.14.0'
  }

  environment {
    ARTIFACTORY_URL = 'https://chewyinc.jfrog.io'
    ARTIFACTORY_USER = credentials('artifactory-username')
    ARTIFACTORY_PASSWORD = credentials('artifactory-password')
    CI = 'true'
  }

  stages {
    stage ('Check for [skip-ci]') {
      steps {
        script {
          env.CI_SKIP = "false"
          result = sh (script: "git log --oneline -n 1 | grep '^.*\\[skip ci\\]'", returnStatus: true)
          if (result == 0) {
            env.CI_SKIP = "true"
            currentBuild.result = 'NOT_BUILT'
            error "'[skip ci]' found in git commit message. Aborting the build."
          }
        }
      }
    }

    stage('Authorize') {
      steps {
        sh """
            export ARTIFACTORY_AUTH=${env.ARTIFACTORY_USER}:${env.ARTIFACTORY_PASSWORD}
            export ARTIFACTORY_REQUEST=${env.ARTIFACTORY_URL}/chewyinc/api/npm/auth/
            curl -u \${ARTIFACTORY_AUTH} \${ARTIFACTORY_REQUEST} > .npmrc
            echo "registry=https://chewyinc.jfrog.io/chewyinc/api/npm/npm/" >> .npmrc
        """
      }
    }

    // Jenkins plays it safe and checks out a revision, not a branch. Lerna needs the branch checked out.
    stage('Checkout branch') {
      steps {
        script {
          withCredentials([usernameColonPassword(credentialsId: 'jenkins-github-userpass', variable: 'GIT_CREDENTIALS'),
                          usernamePassword(credentialsId: 'jenkins-github-userpass',
                                          passwordVariable: 'GRGIT_PASS',
                                          usernameVariable: 'GRGIT_USER')])
          {
            sh 'git checkout \${BRANCH_NAME}'
            sh 'git remote set-url origin https://${GRGIT_USER}:${GRGIT_PASS}@github.com/Chewy-Inc/chewy-auth-keycloak-themes.git'
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        configFileProvider([configFile(fileId: 'npmrc-default', targetLocation: '.npmrc')]) {
          withCredentials([usernamePassword(credentialsId: 'jenkins-github-userpass',
            passwordVariable: 'GRGIT_PASS',
            usernameVariable: 'GRGIT_USER')]) {
            sh 'yarn install --frozen-lockfile'
          }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }

    stage('Publish') {
      when {
        expression {
          env.BRANCH_NAME == 'master'
        }
      }
      steps {
        script {
          withCredentials([usernameColonPassword(credentialsId: 'jenkins-github-userpass', variable: 'GIT_CREDENTIALS'),
                          usernamePassword(credentialsId: 'jenkins-github-userpass',
                                          passwordVariable: 'GRGIT_PASS',
                                          usernameVariable: 'GRGIT_USER')])
          {
            sh 'npm version patch'
            sh 'git push && git push --tags'
            sh 'npm publish themes'
          }
        }
      }
    }
  }

  post {
    always {
      script {
        if (env.CI_SKIP == "true") {
          currentBuild.result = 'NOT_BUILT' //adjust as needed
        }
      }
    }
  }
}