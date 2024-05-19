import NextLink from 'next/link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import Image from 'next/image';

// ==============================|| MAIN LOGO ||============================== //

const logo = '/assets/images/logo/logo.png';

const LogoSection = () => (
  <NextLink href={"/"} aria-label="theme logo">
    <Image src={logo} height={300} width={300} alt="Gotchajob_logo" style={{ maxWidth: '90%', height: '30px' }} />
  </NextLink>
);

export default LogoSection;
