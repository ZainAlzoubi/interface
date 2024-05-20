import React from 'react';
import { Link } from 'react-router-dom';
import Camera from './Cameras';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonAppBar from './bottombar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function Payload() {
//   const history = useHistory();

//   const handleGoBack = () => {
//     // Navigate back to the previous route (AppView)
    
//   };

  return (
<div style={{maxWidth:'90vw',maxHeight:'90vh',position:'relative',top:'1rem',margin:' 0 auto'}}>
 
  {/* <div style={{height:'100%',backgroundColor:'rgba(0, 0, 0, 0.5)',borderRadius:'20%'}}><KeyboardBackspaceOutlinedIcon/>BACK</div> */}
      <Camera
            gridArea=''
            id="payload"
            width='100%'
            height='100%'
            // onClick={() => handleCameraClick("payload")}
            // isExpanded={expandedCameraId === "payload"}
          />    
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:'20px',alignItems:'center'}}>
    
   <Link to="/" style={{color:'white',textDecoration:'none'}}>
    <AppBar sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(33, 43, 54, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      borderRadius:'50px',
      position:'relative',
      // bottom:'20px',
      top:'12px', 
      width: '100%',
      height:'20%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backdropFilter: 'blur(100px)',
      rowGap:'20px'}}>
              <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Content */}
        </Typography>
      <ArrowBackIosIcon/>BACK
      </Toolbar>
      </AppBar>
   </Link>    

   <ButtonAppBar/> 
        </div>
      
    </div>
  );
}

export default Payload;
