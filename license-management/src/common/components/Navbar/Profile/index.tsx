import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Avatar, Divider, IconButton, Tooltip ,Card,CardContent} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import profileLogo from '../../../../assets/brand.jpg';
import styles from './index.module.scss';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import CloseIcon from '@mui/icons-material/CancelSharp';

//to print color color icon based on screen size 
interface ProfileProps {
    iconColor: "white" | "black";
}



function Profile(props: ProfileProps) {
    //icon color props
    const { iconColor } = props;
    //useState in mui Drawer
    const [open, setOpen] = React.useState(false);
    
    //open toggle drawer 
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    //to style profile icon
    const menuId = 'primary-search-account-menu';

    const DrawerList = (
        //
        <Box sx={{ width: iconColor == "black" ? 320 : 400, margin:'10px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.6)",borderRadius:"10px" , background:'white', height:"100vh",overflow:"scroll", "::-webkit-scrollbar":{display:"none"} }} role="Profile" onClick={toggleDrawer(false)}>   
            <div className={styles.profile}>
              <div style={{display:"flex"}}>      
               <Card sx={{height:"130px",width:"100%", }}> 
                <CardContent>
                    <div style={{ display: "flex", alignItems: "center" }}>      
                     <Avatar sx={{ width: "80px", height: "80px", borderRadius: "10px" }}  />
                        <div style={{ marginLeft: "10px" }}>
                            <p style={{fontWeight:"500"}}>Divami</p>
                            <p style={{opacity:"0.7"}}>Divami@gmail.com</p>
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"end",gap:"10px",cursor:"pointer"}}>
                            <LogoutSharpIcon sx={{color:"red"}} />
                        <p>Sign Out</p>
                    </div>
                </CardContent>
               </Card>

             <div style={{display:"flex",justifyContent:"end",cursor:"pointer"}}>
                 <CloseIcon />
              </div>
              </div>
              
                <Card sx={{marginTop:"60px",height:"100px"}}>
                    <CardContent sx={{display:"flex", justifyContent:"center",alignItems:"center",gap:"10px"}}>
                      <img src={profileLogo} className={styles.profileLogo} />
                     <span className={styles.profileTitle}>Divami Design Labs Private Limited</span>
                    </CardContent>
                </Card>   
            </div>
            <Divider />
            <br/>  
            <p className={styles.caption}>Focuses on design excellence and strategic growth</p>         
        </Box>
    );

    return (
        <div>
            <Tooltip title='Profile'>
                <div onClick={toggleDrawer(true)} className={styles.mobile}>
                    <IconButton
                        size="large"
                        edge='end'
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ color: iconColor}}
                    >
                        <AccountCircle  sx={{
                            fontSize:'30px'
                        }}/>
                    </IconButton>

                    {/* for mobile versions */}
                    {iconColor == "black" && <p>Profile</p>}
                </div>
            </Tooltip>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'   sx={{
                "& .MuiDrawer-paper":{
                    backgroundColor:"transparent",
                    boxShadow:"none"
                }
            }}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Profile;
