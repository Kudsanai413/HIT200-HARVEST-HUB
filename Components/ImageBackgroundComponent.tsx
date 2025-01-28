import { ImageBackground } from 'react-native';
import { styling as global } from "@/assets/styles/global"
import React from 'react';
import useGetFileContext from '@/Context/FileContext';

type props = {

  children : React.JSX.Element | React.JSX.Element[],
  img?: any,
}

function ImageBackgroundComponent({ children, img} : props)
{
  return (
    <ImageBackground
		source={ img }
		style={ {...global.body, ...global.background_image } }
    >

        { children }

    </ImageBackground>
  )
}

export default ImageBackgroundComponent