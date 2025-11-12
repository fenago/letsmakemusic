import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Modal } from 'react-native'

import { Camera } from 'expo-camera'

import IMPreCamera from './IMPreCamera'
import IMPostCamera from './IMPostCamera'
import styles from './styles'

export default function IMCameraModal(props) {
  const [cameraType, setCameraType] = useState('back')  // Changed: Direct string instead of Camera.Constants.Type.back
  const [flashMode, setFlashMode] = useState('off')    // Changed: Direct string instead of Camera.Constants.FlashMode.off
  const [isCameraPlay, setIsCameraPlay] = useState(true)
  const [imageSource, setImageSource] = useState('')
  const [videoRate, setVideoRate] = useState(1.0)

  const cameraRef = useRef(null)

  useEffect(() => {
    if (imageSource?.uri) {
      toggleCameraPlay()
    }
  }, [imageSource])

  const toggleCameraPlay = () => {
    setIsCameraPlay(prevIsCameraPlay => !prevIsCameraPlay)
  }

  const onMediaFileAvailable = mediaFile => {
    const { uri, type } = mediaFile
    if (props.muteRecord) {
      toggleCameraPlay()
      props.onStopRecordingVideo(mediaFile, videoRate)
      return
    }
    setImageSource({
      ...mediaFile,
      uri,
      type: type,
      rate: videoRate,
    })
  }

  const takePicture = async () => {
    if (props.useExternalSound) {
      return
    }
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, pauseAfterCapture: true }
      const file = await cameraRef.current.takePictureAsync(options)
      const uri = file.uri
      if (uri) {
        onMediaFileAvailable({ ...file, type: 'image' })
      }
    }
  }

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        props.onStartRecordingVideo && props.onStartRecordingVideo()
        const videoRecordPromise = cameraRef.current.recordAsync({
          mute: props.muteRecord,
          quality: '720p',
        })

        if (videoRecordPromise) {
          const file = await videoRecordPromise
          const uri = file.uri
          if (uri) {
            onMediaFileAvailable({ ...file, type: 'video' })
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const stopVideoRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording()
    }
  }

  const onOpenPhotos = async () => {
    const pickerMediaType =
      ImagePicker.MediaTypeOptions[props.pickerMediaType] ??
      ImagePicker.MediaTypeOptions.All
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(false)

    if (permissionResult.granted === false) {
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: pickerMediaType,
    })

    if (result.canceled !== true) {
      onMediaFileAvailable(result.assets[0])
    }
  }

  const onFlashToggle = () => {
    let newFlashMode = 'torch'  // Changed: Direct string

    if (flashMode === newFlashMode) {
      newFlashMode = 'off'  // Changed: Direct string
    }

    if (flashMode === 'off') {  // Changed: Direct string comparison
      newFlashMode = 'torch'  // Changed: Direct string
    }

    setFlashMode(newFlashMode)
  }

  const onCameraFlip = () => {
    setCameraType(  // Changed: String comparison
      cameraType === 'back'  // Changed: Direct string
        ? 'front'             // Changed: Direct string
        : 'back',             // Changed: Direct string
    )
  }

  const onCancelPostCamera = () => {
    cameraRef.current.resumePreview()
    toggleCameraPlay()
    setImageSource('')
    props.onCancelPost && props.onCancelPost()
  }

  const onPost = () => {
    props.onImagePost(imageSource)
    toggleCameraPlay()
  }

  const onVideoSpeedChange = newSpeed => {
    setVideoRate(newSpeed)
  }

  const onVideoLoadStart = () => {}

  const { isCameraOpen, onCameraClose } = props
  const Container = props.wrapInModal ? Modal : Fragment
  const modalProps = {
    style: styles.container,
    visible: isCameraOpen,
    onDismiss: onCameraClose,
    onRequestClose: onCameraClose,
    animationType: 'slide',
  }

  return (
    <Container {...(props.wrapInModal ? modalProps : {})}>
      <Camera
        ref={cameraRef}
        style={styles.preview}
        type={cameraType}
        flashMode={flashMode}
      />
      {isCameraPlay && (
        <IMPreCamera
          onCameraClose={onCameraClose}
          onCameraFlip={onCameraFlip}
          takePicture={takePicture}
          flashMode={flashMode}
          soundTitle={props.soundTitle}
          onOpenPhotos={onOpenPhotos}
          onFlashToggle={onFlashToggle}
          onSoundPress={props.onSoundPress}
          onVideoSpeedChange={onVideoSpeedChange}
          record={recordVideo}
          soundDuration={props.soundDuration}
          stopRecording={stopVideoRecording}
          useExternalSound={props.useExternalSound}
        />
      )}

      {!!(props.mediaSource || imageSource) && !isCameraPlay && (
        <IMPostCamera
          onCancel={onCancelPostCamera}
          imageSource={props.mediaSource ?? imageSource}
          onPost={onPost}
          onVideoLoadStart={onVideoLoadStart}
        />
      )}
    </Container>
  )
}