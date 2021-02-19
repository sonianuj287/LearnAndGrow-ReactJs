import React, { Component } from "react";
import storage from "../Firestore";
import firebase from "../Firebase";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      title: "",
      description: "",
      price: "",
      name: "",
      standard: ""
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  // handleChange = e => {
  //   for (let i = 0; i < e.target.files.length; i++) {
  //        const newFile = e.target.files[i];
  //        newFile["id"] = Math.random();
  //     // add an "id" property to each File object
  //       //  setFiles(prevState => [...prevState, newFile]);
  //        this.setState(() => (prevState => ({image: [...prevState.image, newFile]})));
  //       //  this.setState(prevState => ({arrayvar: [...prevState.arrayvar, newelement]}))
  //      }
  //    };

  handleTitleChange = e => {
    if (e.target.value) {
      const title = e.target.value;
      this.setState(() => ({ title }));
    }
  };
  handleDescriptionChange = e => {
    if (e.target.value) {
      const description = e.target.value;
      this.setState(() => ({ description }));
    }
  };
  handlePriceChange = e => {
    if (e.target.value) {
      const price = e.target.value;
      this.setState(() => ({ price }));
    }
  };
  handleNameChange = e => {
    if (e.target.value) {
      const name = e.target.value;
      this.setState(() => ({ name }));
    }
  };
  handleStandardChange = e => {
    if (e.target.value) {
      const standard = e.target.value;
      this.setState(() => ({ standard }));
    }
  };

  handleUpload = e => {
    const { image } = this.state;
    const { title } = this.state;
    const { description } = this.state;
    const { price } = this.state;
    const { name } = this.state;
    const { standard } = this.state;
    const uploadTask = 
    storage.ref(`courses/${title}/ ${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref(`courses/${title}/`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("courses")
    .doc(this.state.title)
    .set({
      Title: this.state.title,
      Description: this.state.description,
      Price: this.state.price,
      Tutor: this.state.name,
      Rating: 0,
      Standard: this.state.standard
    }); 
    this.setState({
      Title: "",
      Description: "",
      Price: 0,
      Tutor: "",
      Standard: ""
    });
  };

  // handleUpload = e => {
  //     this.state.image.forEach(file => {
  //       const { image } = this.state;
  //       const { title } = this.state;
  //       const { description } = this.state;
  //       const { price } = this.state;
  //       const { name } = this.state;
  //       const { standard } = this.state;
  //       const uploadTask = 
  //       storage.ref()(`courses/${title}/ ${image.name}`).put(file);
  //         uploadTask.on(
  //           "state_changed",
  //           snapshot => {
  //             // progress function ...
  //             const progress = Math.round(
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //             );
  //             this.setState({ progress });
  //           },
  //              error => console.log(error.code),
  //              () => {
  //               storage
  //                 .ref(`courses/${title}/`)
  //                 .child(image.name)
  //                 .getDownloadURL()
  //                 .then(url => {
  //                   this.setState({ url });
  //                 });
  //             }
  //              );
  //            });
  //            e.preventDefault();
  //         const db = firebase.firestore();
  //         db.settings({
  //           timestampsInSnapshots: true
  //         });
  //         const userRef = db.collection("courses")
  //         .doc(this.state.title)
  //         .set({
  //           Title: this.state.title,
  //           Description: this.state.description,
  //           Price: this.state.price,
  //           Tutor: this.state.name,
  //           Rating: 0,
  //           Standard: this.state.standard
  //         }); 
  //         this.setState({
  //           Title: "",
  //           Description: "",
  //           Price: 0,
  //           Tutor: "",
  //           Standard: ""
  //         });
  //  }

  render() {
    return (
      <div className="center">
          <br/>
          <h2 className="green-text">React Firebase Image Uploader</h2>
          <br/>
        <div className="file-field input-field">

          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}} >
            <p style={{width:500}} >Title of the Course Track</p>
            <input className="file-path validate" type="text" name="title" placeholder="Title" value={this.state.title} style={{height:20,padding:5,margin:10}} onChange={this.handleTitleChange} />
          </div>
          <br/>
          <div className="file-path-wrapper" style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Description of the video</p>
            <input className="file-path validate" type="text" name="description" placeholder="Description" value={this.state.description} style={{height:20,padding:5,margin:10}} onChange={this.handleDescriptionChange} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Price of the video</p>
            <input className="file-path validate" type="text" name="price" placeholder="Price" value={this.state.price} style={{height:20,padding:5,margin:10}} onChange={this.handlePriceChange} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Tutor's name</p>
            <input className="file-path validate" type="text" name="name" placeholder="Tutor's Name" value={this.state.name} style={{height:20,padding:5,margin:10}} onChange={this.handleNameChange} />
          </div>
          <br/>
          <div className="file-path-wrapper"style={{flexDirection:'row', display:'inline-flex'}}>
            <p style={{width:500}}>Standard</p>
            <input className="file-path validate" type="text" name="name" placeholder="Standard" value={this.state.standard} style={{height:20,padding:5,margin:10}} onChange={this.handleStandardChange} />
          </div>
          <br/>
          <div className="btn" style={{flexDirection:'row', display:'inline-flex',marginLeft:150}} >
          <p style={{height:20,padding:5,margin:10}} >File</p>

            <input type="file" multiple onChange={this.handleChange}style={{height:20,padding:5,margin:10}} />

            <progress value={this.state.progress} max="100" className="progress" style={{height:20,padding:5,margin:10}} />
        <input type='button' value='+' style={{height:20,margin:10}} 
          className="waves-effect waves-light btn" />
          </div>
          <br/>

          
        </div>
        <button style={{height:20,margin:10}} 
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default Contact;