/* eslint-disable prettier/prettier */

import { launchCamera, launchImageLibrary } from "react-native-image-picker";


export class CameraAdapter {
    static async takePicture(): Promise<string[]>{
        const result = await launchCamera({
           mediaType:'photo',
           quality: 0.7,
           cameraType:'back',
        });
        if(result.assets && result.assets[0].uri){
            return [result.assets[0].uri];
        }
        return[];
    }

    static async getPicturesFromLibrary(): Promise<string[]>{
        const result = await launchImageLibrary({
            mediaType:'photo',
            quality: 0.7,
            selectionLimit: 7,
         });
         if(result.assets && result.assets.length  > 0){
            return result.assets.map( asset => asset.uri!);

        }
        return[];
    }
}       