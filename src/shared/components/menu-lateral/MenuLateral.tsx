import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts";

interface IMenuLateral {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateral> = ( {children} ) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen}  variant={smDown ? 'temporary' : 'permanent'} >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)} display='flex' justifyContent="center" alignItems="center">
            <Avatar 
              src="https://preview.redd.it/okl106l8vgp41.png?auto=webp&s=d7a3ccd0e6eae1584762b05187745b6a24fd9f85"
              sx={{ height: theme.spacing(12), width: theme.spacing(12)}}
            />
          </Box>

          <Divider />

          <Box flex={1}> 
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home </Icon>
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>
            </List>

          </Box>

        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={ smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}