// uploadimage creates a modal witha  form for uploading images and creating captions
import style from '../styles/uploadimage.css'
import { useState, useEffect } from 'react'
import SubmissionForm from './submission_form';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import uniqid from 'uniqid'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm, faArrowLeft, faExpand, faMagnifyingGlassPlus, faLayerGroup, faUser} from '@fortawesome/free-solid-svg-icons'
import { uploadImage,createPost } from '../data/setdata';
import { getUserObject } from '../data/getdata';

function UploadImage(props) {

    const [imageSelected, setImageSelected] = useState(false)
    const [imageToUpload, setImageToUpload] = useState(null)
    const [selectImage, setSelectImage] = useState(true) // when creating a new post, first user must select an image, this sets that form so it can be toggled
    const [shareImage, setShareImage] = useState(false) // setting true will advance upload image process to pre-submission
    const db = props.firebaseDependencies[3]

    // Functions

    const closeModal = props.appFunctions[0]


    function onImageSelect(e) {
        // selecting an image will start the process of uploading and show a preview in upload modal
        const image = e.target.files[0]
        setImageSelected(true)
        setImageToUpload(image)
    }

    function discardChanges() {
        if(window.confirm("Do you want to discard?")) {
            setImageSelected(false)
            closeModal()
        } 
    }

    function closeUploadModal() {
        // close upload modal
        console.log("Closing upload modal")
        closeModal()
    }

    function advanceToSubmit() {
        // close uploadImage form and open final submission form
        console.log("Final touches before submitting, adding caption, etc")
        setSelectImage(false)
    }

    function submitPost() {
        //submit post to database, close modal
        // for now just get shawn as a user, TODO later
        let shawn = getUserObject('1', 'users', db) // this returns a promise

        if(window.confirm("Are you sure you'd like to submit post?")) {
            console.log("Submitting to db")
            // update database with post imnformation here

            uploadImage(`/images/1/${imageToUpload.name}`, imageToUpload) // '1' is userID, for testing it is just Shawn id 1 for now
            let postID = uniqid(); // use this as the post ID
            const toPost = {
                id: postID,
                imageURL: `/images/1/${imageToUpload.name}`, // TODO: SET TO STORAGE BUCKET , IMG SHOULD BE STORED AS POST ID?
                data: new Date(),
            }
            createPost(db, 'posts', shawn, toPost)

            closeModal()
        }
    }
    // clicking 'Next' show take user to upload form that lets them write a caption and finall submit
    // NOTE ON GETTING IMAGE
    // USE THE FILE REFERENCE PATH THAT IS CREATED AS A REFERENCE IE USERIMAGES/IMAGE.JPG
    useEffect(() => {

    }, [imageSelected])
    return(
        <div className="upload-image">
            <button className="upload-image-modal-close" onClick={closeUploadModal}>X</button>
            {selectImage
            ?<div className="select-image">
                {imageSelected
                ? <form className="upload-image-form edit">
                    <div className="upload-image-navbar">
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" onClick={discardChanges}/>
                        <p>Crop</p>
                        <p style={{color:'blue'}} onClick={advanceToSubmit}>Next</p>
                    </div>
                    <img src={URL.createObjectURL(imageToUpload)} alt="to upload" />
                    <div className="edit-image-footer">
                        <div className="edit-image-footer left">
                            <FontAwesomeIcon icon={faExpand} size={"2xl"}/>
                            <FontAwesomeIcon icon={faMagnifyingGlassPlus} size={"2xl"}/>
                        </div>
                        <div className="edit-image-footer right">
                            <FontAwesomeIcon icon={faLayerGroup} size={"2xl"}/>
                        </div>
                        
                    </div>
                </form>
                :<form className="upload-image-form">
                    <FontAwesomeIcon icon={faPhotoFilm} size={'6x'} color={'grey'}/>
                    <p className="upload-image-p">Drag photos or videos here</p>
                    <label htmlFor="image-upload" className="image-upload">
                        Select from Computer
                    </label>
                    <input id="image-upload" type="file" name="file" onChange={onImageSelect}/>
                </form>
                }

            </div>
            :<div className="submission-form-modal">
                    <div className="upload-image-navbar">
                        <FontAwesomeIcon icon={faArrowLeft} size="xl" onClick={discardChanges}/>
                        <p>Create New Post</p>
                        <p style={{color:'blue'}} onClick={submitPost}>Share</p>
                    </div>
                <hr />
                <div className="preview-submission-container">
                    <img src={URL.createObjectURL(imageToUpload)} alt="to upload" />
                    <div className="vert-line">
                    </div>
                    <form className="submission-form">
                        <div className="username-profile">
                            <FontAwesomeIcon icon={faUser} size={"2xl"} />
                            <p>Shaawn</p>
                        </div>
                        <textarea placeholder="Write something...">
                        </textarea>
                        <hr />
                        <input className="emoji-select" type="text" />
                    </form>
                </div>
            </div>
            }
        </div>
    )
}

export default UploadImage