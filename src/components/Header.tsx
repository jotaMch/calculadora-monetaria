import { Box } from "@chakra-ui/react"


export const Header: React.FC = () => {
    return(
        <Box bg='teal' display='flex' justifyContent='center' alignItems='center' 
        h={20} color='#fff' fontSize={20} fontWeight='bold'> 
            Calculadora monetária
        </Box>
    )
}