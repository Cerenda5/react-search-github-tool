import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormUser from './FormUser';

class App extends Component{

  constructor(props) {
    super(props)

    this.state = {
        repo: false,
        user: false,
        username: false,
        githubRepos: false,
        githubReposUser: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleSubmit(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const username = data.get('username');
      this.fetchUserRepo(username);
      this.fetchRepo(username);
    }

    async fetchUserRepo(username) {
      fetch("https://api.github.com/users/" + username + "/repos")
          .then(res => res.json())
          .then(
              (result) => {
                  if (result.message === "Not Found"){
                      document.location.reload();
                  }
                  this.setState({
                      repo: true,
                      githubRepos: result
                  });
              }).catch((error) => {
          console.log('catch: ', error)
      });
      this.setState({
          repo: false
      });
    }

    async fetchRepo(username) {
      fetch("https://api.github.com/users/" + username)
          .then(res => res.json())
          .then(
              (result) => {
                  if (result.message === "Not Found"){
                      document.location.reload();
                  }
                  this.setState({
                      user: true,
                      githubUser: result
                  })
              }).catch((error) => {
          console.log('catch: ', error)
      });
        this.setState({
            user: false
        });
    }

    render() {
        const { repo, user, githubRepos, githubUser} = this.state
        return (
            <div >
                <div className="header">
                    <div className="inner_header">
                        <div className="logo_container">
                            <h1>Github Search Tool</h1>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <FormUser handleSubmit={this.handleSubmit}/>
                    {
                        (repo && user) && githubRepos && githubUser &&
                        <div className="infos">
                            <br/>
                            <div class="card-user">
                                    <p>{githubUser.name}</p>
                                    <img src={githubUser.avatar_url} height="100" width="100" className="img-fluid rounded-circle " alt={githubUser.avatar_url}/><br/>
                                    <h3><span>{githubUser.login}</span></h3><br/>
                                    <a href={githubUser.html_url}>Access to user's github profile</a><br/>
                                    <span>Followers: {githubUser.followers}</span><br/>
                                    <span>Following: {githubUser.following}</span>
                            </div>
                            <br/>
                            <br/>
                                {
                                    githubRepos.map((repo, key)=>{
                                        if (repo.fork != true)
                                        return (
                                            <div class="row">
                                                <div class="column">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div key={key}>
                                                                <h4><a href={repo.clone_url}>{repo.name}</a></h4>
                                                                <br/>
                                                                <span>Language: {repo.language}</span><br/>
                                                                <span>Stars: {repo.stargazers_count}</span><br/>
                                                                <span>Forks: {repo.forks}</span>
                                                                <br/><br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    }
            </div>
        )
    }
}

export default App
