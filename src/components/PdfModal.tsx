import React from 'react';
import { Alert, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Pdf from 'react-native-pdf';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import AppFonts from '../constants/AppFonts';
import RNFS from 'react-native-fs'
import AppImages from '../constants/AppImages';
import { showToast } from '../constants/commonUtils';

interface Props {
    visible: any;
    pdfUrl: any;
    onClose: any;
    jobStatus?: any
}

const PdfModal = ({ visible, pdfUrl, onClose, jobStatus}: Props) => {
   
    const handleDownload = async (pdfUrl) => {
        try {
            const downloadDir = RNFS.DownloadDirectoryPath;
          const pdfFileName = 'downloaded_pdf.pdf';
          const pdfFilePath = `${downloadDir}/${pdfFileName}`;
    
          const options = {
            fromUrl: pdfUrl,
            toFile: pdfFilePath,
          };
    
          const result = await RNFS.downloadFile(options).promise;
    
          if (result.statusCode === 200) {
              showToast('PDF Downloaded Successfully!' + 'Downloaded File Path:' + pdfFilePath);
          } else {
           showToast('Failed to download PDF!')
          }
        } catch (error) {
         showToast('Error while downloading PDF:' + error)
        }
      };
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {jobStatus == true ?
        <View flex marginV-30 marginH-20>
            <Text style={{fontSize:20, fontFamily:AppFonts.POPPINS_SEMIBOLD}}>Documents</Text>
       <ScrollView >
        {pdfUrl.length == 0 ?
        <View center>
          <Text>No documents requested</Text>
        </View>
        :
       pdfUrl.map((item, index) => (
         <View key={index} marginV-10>
           <Pdf
           trustAllCerts={false}
             source={{ uri: 'https://admin-jamal.prompttechdemohosting.com/' + item.document }}
             style={{ flex: 1, height: 300, width:'100%',borderColor:'black', borderWidth:2}}
           />
           <View row centerV style={{justifyContent:'space-between'}}>
            <View>
            <Text>Name: {item.user.name}</Text>
            <Text>Email: {item.user.email}</Text>
            </View>
           
             <TouchableOpacity
               onPress={() => handleDownload('https://admin-jamal.prompttechdemohosting.com/' + item.document)}>
                <Image source={AppImages.DOWNLOAD}/>
               </TouchableOpacity>
           </View>
           
         </View>
       ))}
     </ScrollView>
   </View>
:
<View flex>
<Pdf
     trustAllCerts={false}
     source={{ uri: pdfUrl }}
     style={{ flex: 1 }}
   />
    <View style={styles.modalButtonContainer}>
           <Button
             label={'Download'}
             onPress={() => handleDownload(pdfUrl)}
             labelStyle={{
               color: 'white',
               fontSize: 14,
               fontFamily: AppFonts.POPPINS_MEDIUM,
             }}
             style={styles.modalButton}
           />
         </View>
         </View>

}
        <TouchableOpacity onPress={onClose}  style={{position:'absolute',padding:10}}>
        <Image source={AppImages.ARROW_LEFT}/>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  modalButton: {
    width: '40%',
  },
});

export default PdfModal;
