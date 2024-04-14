import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '', label: 'Select...' },
  { value: 'PPT1-2_Coronal_Series.png', label: 'PPT1-2 Coronal Series' },
  { value: 'PPT1-4_Coronal_Series.png', label: 'PPT1-4 Coronal Series' },
  { value: 'PPT1-7_Coronal_Series.png', label: 'PPT1-7 Coronal Series' },
  { value: 'WT-2_Coronal_Series.png', label: 'WT-2 Coronal Series' },
  { value: 'WT-12_Coronal_Series.png', label: 'WT-12 Coronal Series' },
  { value: 'WT-18_Coronal_Series.png', label: 'WT-18 Coronal Series' },
  { value: 'WT-24_Coronal_Series.png', label: 'WT-24 Coronal Series' },
];

// Assuming the images are stored in a publicly accessible folder
const ImageSelectorWithAllImages = () => {
  const [selectedImage, setSelectedImage] = useState('');

  return (
    <div style={{margin: "4rem", display: 'flex'}}>
      <div style={{marginRight: "2rem", width: "17%"}}>
      <div style={{marginBottom: "2rem", fontSize: "1.5rem"}}>Cornal Region</div>
      <Select
        onChange={(option) => setSelectedImage(option ? option.value : '')}
        options={options}
        isClearable={true}
        isSearchable={true}
        placeholder="Select..."
      />
      </div>
      <div>
        {/* <div style={{marginBottom: "2rem"}}>Scale</div> */}
        <img src="ScaleBar.png" style={{width: "40px", height: "auto", marginRight: "3rem", marginTop: "2rem"}}></img>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {options.filter(option => option.value !== '').map((option) => (
          <div key={option.value} style={{ textAlign: 'center' }}>
            <img
              src={`${option.value}`}
              alt={option.label}
              style={{
                width: selectedImage === option.value ? '125px' : '90px', // Only enlarge selected image
                height: 'auto',
                border: selectedImage === option.value ? '1px #edc637 solid' : "None",
                transition: 'width 0.3s ease-in-out', // Smooth transition for resizing
                cursor: 'pointer',
                padding: "1rem"
              }}
              onClick={() => setSelectedImage(option.value)}
            />
            {/* <div>{option.label}</div> */}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ImageSelectorWithAllImages;
