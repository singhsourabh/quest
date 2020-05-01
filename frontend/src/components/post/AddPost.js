import React, { Component } from "react";
import { connect } from "react-redux";

class AddPost extends Component {
  render() {
    return (
      //   <div className="container">
      //     <div className="row auth-box">
      //       <form className="col s12 m10 l8 offset-m1 offset-l2">
      //         <div className="card-panel auth-card">
      //           <div className="center-align teal-text">
      //             <h3 className="auth-heading">Add Post</h3>
      //           </div>
      //           <button type="submit" className="col s12 btn waves-effect">
      //             Add
      //           </button>
      //           <div className="input-field">
      //             <input className="validate" type="text" id="title-post"></input>
      //             <label htmlFor="title-post">Enter Title</label>
      //           </div>
      //           <div className="input-field">
      //             <textarea
      //               className="materialize-textarea validate"
      //               id="details-post"
      //             ></textarea>
      //             <label htmlFor="details-post">Enter details</label>
      //           </div>
      //         </div>
      //       </form>
      //     </div>
      //   </div>

      <div className="container">
        <div className="row auth-box">
          <form className="col s12 m8 l6 offset-m2 offset-l3">
            <div className="card-panel auth-card">
              <div className="center-align teal-text">
                <h3 className="auth-heading">Add Post</h3>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="text"
                  id="title-addpost"
                ></input>
                <label htmlFor="title-addpost">Enter post title</label>
              </div>
              <div className="input-field">
                <textarea
                  className="materialize-textarea validate"
                  id="details-addpost"
                ></textarea>
                <label htmlFor="details-addpost">Describe your post</label>
              </div>
              <button type="submit" className="col s12 btn waves-effect">
                Add
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(AddPost);
