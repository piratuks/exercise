import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import LogoSvg from 'assets/logo.svg';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from './constant';

const Block = styled.div`
  box-shadow: 0 6px 15px rgba(52, 58, 64, 0.3);
  height: 100px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
`;
const LogoImg = styled.img`
  cursor: pointer;
  width: 90px;
`;
const Container = styled(Box)`
  max-width: 1320px;
  margin-right: auto;
  margin-left: auto;
`;

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  return (
    <Block>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoImg src={LogoSvg} alt="React App" />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', flexGrow: 1 }}>
          <Button variant="contained" onClick={() => navigate(routes.form)}>
            User
          </Button>
        </Box>
      </Container>
    </Block>
  );
};
