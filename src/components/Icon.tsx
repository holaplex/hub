import clsx from 'clsx';

export interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function Icon() {
  return <div></div>;
}
function LargeIcon() {
  return <div></div>;
}
Icon.Large = LargeIcon;

function CryptoIcon() {
  return <div></div>;
}
Icon.Crypto = CryptoIcon;

function EthLarge({
  width = 28,
  height = 42,
  fill = '#AAAAAA',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 42"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.996 0.299988L0.200001 21.3839L13.996 28.8951V15.6083V0.299988Z" fill={fill} />
      <path
        d="M13.996 0.299988L13.6946 1.24336V28.6179L13.996 28.8951L27.7919 21.3839L13.996 0.299988Z"
        fill={fill}
      />
      <path
        d="M13.9958 31.301L13.826 31.4917V41.2431L13.9958 41.7L27.8 23.7937L13.9958 31.301Z"
        fill={fill}
      />
      <path d="M13.9958 41.7V31.301L0.200001 23.7936L13.9958 41.7Z" fill={fill} />
    </svg>
  );
}
LargeIcon.Eth = EthLarge;

function SolanaLarge({
  width = 38,
  height = 38,
  fill = '#AAAAAA',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.57884 0.525871C6.81014 0.320065 7.11547 0.200012 7.43005 0.200012H36.7967C37.3334 0.200012 37.6017 0.800278 37.2224 1.15186L31.4212 6.52853C31.1991 6.73434 30.8938 6.85439 30.57 6.85439H1.20327C0.666637 6.85439 0.398321 6.25412 0.777664 5.90254L6.57884 0.525871Z"
        fill={fill}
      />
      <path
        d="M31.4212 10.9987C31.1991 10.7929 30.8938 10.6728 30.57 10.6728H1.20327C0.666637 10.6728 0.398321 11.2731 0.777664 11.6247L6.57884 17.0014C6.80089 17.2072 7.10622 17.3272 7.43005 17.3272H36.7967C37.3334 17.3272 37.6017 16.7269 37.2224 16.3754L31.4212 10.9987Z"
        fill={fill}
      />
      <path
        d="M6.57884 21.4715C6.80089 21.2657 7.10622 21.1456 7.43005 21.1456H36.7967C37.3334 21.1456 37.6017 21.7459 37.2224 22.0975L31.4212 27.4742C31.1991 27.68 30.8938 27.8 30.57 27.8H1.20327C0.666637 27.8 0.398321 27.1997 0.777664 26.8482L6.57884 21.4715Z"
        fill={fill}
      />
    </svg>
  );
}
LargeIcon.Solana = SolanaLarge;

function Logout({ width = 20, height = 20, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.94678 13.8926L2.0005 10.9463L4.94678 8.00002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.2503 10.8752L2.0007 10.8752" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.50049 13.6668L7.50049 15.8335C7.50049 16.7543 8.24632 17.5001 9.16716 17.5001L14.1672 17.5001C15.088 17.5001 15.8338 16.7543 15.8338 15.8335L15.8338 5.83345C15.8338 4.91262 15.088 4.16679 14.1672 4.16679C14.1672 4.16679 10.6277 4.16679 9.00049 4.16679C8.00049 4.16679 7.50049 4.8156 7.50049 5.50012C7.50049 6.70012 7.50049 7.66679 7.50049 8.00012"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Logout = Logout;

function HelpHeadphones({ width = 20, height = 20, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5031 10C17.5031 14.1439 14.1439 17.5031 10 17.5031"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.49707 9.99995C2.49707 5.85609 5.85633 2.49683 10.0002 2.49683"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.49707 10C2.49719 10.8789 2.6535 11.7508 2.95873 12.5749C3.09832 12.9577 3.49188 13.1857 3.89337 13.1164L4.71554 12.9714C5.38004 12.8542 5.83176 12.231 5.73634 11.563L5.48888 9.83086C5.44097 9.49553 5.25908 9.19399 4.98482 8.9952C4.71055 8.79641 4.36737 8.71739 4.03379 8.77621L2.56602 9.03501"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5031 9.99995C17.5031 5.85609 14.1439 2.49683 10 2.49683"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.503 10C17.5028 10.8789 17.3465 11.7508 17.0413 12.5749C16.9017 12.9577 16.5081 13.1857 16.1067 13.1164L15.2845 12.9714C14.62 12.8542 14.1683 12.231 14.2637 11.563L14.5111 9.83086C14.5591 9.49553 14.7409 9.19399 15.0152 8.9952C15.2895 8.79641 15.6327 8.71739 15.9662 8.77621L17.434 9.03501"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2445 10.4094C11.242 10.4094 11.2397 10.4109 11.2387 10.4132C11.2378 10.4156 11.2383 10.4182 11.2401 10.42C11.2418 10.4218 11.2445 10.4223 11.2469 10.4214C11.2492 10.4204 11.2507 10.4181 11.2507 10.4156C11.2508 10.4139 11.2502 10.4123 11.249 10.4111C11.2478 10.4099 11.2462 10.4093 11.2445 10.4094"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75571 10.4118C8.75318 10.4118 8.75091 10.4134 8.74995 10.4157C8.74898 10.418 8.74952 10.4207 8.7513 10.4225C8.75308 10.4243 8.75576 10.4248 8.75809 10.4238C8.76042 10.4229 8.76193 10.4206 8.76193 10.4181C8.76204 10.4164 8.76142 10.4147 8.76023 10.4135C8.75904 10.4123 8.75738 10.4117 8.75571 10.4118"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.HelpHeadphones = HelpHeadphones;

function Dropdown({ width = 6, height = 4, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 4"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 0.75L3 3.25L5.5 0.75" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
Icon.Dropdown = Dropdown;

function DropdownReverse({ width = 6, height = 4, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 4"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 3.25L3 0.75L0.5 3.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
Icon.DropdownReverse = DropdownReverse;

function AddCredential({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.06357 13.0297V11.9692H8.38957L9.51532 10.8434L11.0693 11.5034C11.6326 11.7427 12.2843 11.6159 12.7163 11.1832L14.9236 8.97595C15.3563 8.5432 15.4823 7.89145 15.2438 7.32895L14.1173 4.67695C13.9658 4.3192 13.6808 4.03495 13.3231 3.8827L10.6711 2.7562C10.1078 2.51695 9.45682 2.6437 9.02407 3.07645L6.81682 5.2837C6.38482 5.7157 6.25807 6.36745 6.49732 6.9307L7.14007 8.44495L2.62207 12.9629V15.3494H5.00857L6.00307 14.3549V13.0289H7.06357V13.0297Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7821 6.67049C10.6028 6.67124 10.4573 6.81674 10.4581 6.99599C10.4581 7.17524 10.6043 7.32074 10.7836 7.31999C10.9628 7.31999 11.1083 7.17449 11.1083 6.99524C11.1083 6.81599 10.9628 6.67049 10.7836 6.67049"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.5 13.5V17.5" stroke={stroke} strokeLinecap="round" />
      <path d="M13.5 15.5H17.5" stroke={stroke} strokeLinecap="round" />
    </svg>
  );
}
Icon.AddCredential = AddCredential;

function CrdentialsLarge({ width = 96, height = 96, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.6088 65.4623V60.8668H45.3548L50.2331 55.9885L56.9671 58.8485C59.4078 59.8853 62.2321 59.336 64.1041 57.4608L73.6688 47.896C75.5441 46.0208 76.0901 43.1965 75.0566 40.759L70.1751 29.267C69.5186 27.7168 68.2836 26.485 66.7333 25.8253L55.2413 20.9438C52.8006 19.907 49.9796 20.4563 48.1043 22.3315L38.5396 31.8963C36.6676 33.7683 36.1183 36.5925 37.1551 39.0333L39.9403 45.595L20.3623 65.173V75.5145H30.7038L35.0133 71.205V65.459H39.6088V65.4623Z"
        fill="#C5C5C5"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55.7217 37.9055C54.9449 37.9087 54.3144 38.5392 54.3177 39.316C54.3177 40.0927 54.9514 40.7232 55.7282 40.72C56.5049 40.72 57.1354 40.0895 57.1354 39.3127C57.1354 38.536 56.5049 37.9055 55.7282 37.9055"
        stroke="#555555"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.Crdentials = CrdentialsLarge;

function Credentials({ width = 20, height = 20, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.84809 14.4774V13.2991H9.32142L10.5723 12.0483L12.2989 12.7816C12.9248 13.0474 13.6489 12.9066 14.1289 12.4258L16.5814 9.97328C17.0623 9.49244 17.2023 8.76828 16.9373 8.14328L15.6856 5.19661C15.5173 4.79911 15.2006 4.48328 14.8031 4.31411L11.8564 3.06244C11.2306 2.79661 10.5073 2.93744 10.0264 3.41828L7.57392 5.87078C7.09392 6.35078 6.95309 7.07494 7.21892 7.70078L7.93309 9.38328L2.91309 14.4033V17.0549H5.56475L6.66975 15.9499V14.4766H7.84809V14.4774Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9799 7.41179C11.7807 7.41262 11.619 7.57429 11.6199 7.77346C11.6199 7.97262 11.7824 8.13429 11.9815 8.13346C12.1807 8.13346 12.3424 7.97179 12.3424 7.77262C12.3424 7.57346 12.1807 7.41179 11.9815 7.41179"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Credentials = Credentials;

function Copy({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="6"
        width="8"
        height="8"
        rx="2"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6V4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V8C14 9.10457 13.1046 10 12 10H10"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Copy = Copy;

function LargeIconWebhook({
  width = 96,
  height = 96,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.8048 16.2991C45.2949 15.0288 49.0833 14.822 52.6909 15.7048C56.2985 16.5876 59.5633 18.5203 62.0725 21.2586C64.5817 23.9969 66.2225 27.4177 66.7875 31.0886C67.3525 34.7594 66.8163 38.5153 65.2467 41.8814C64.514 43.4526 63.3064 44.6506 61.8744 45.3844C62.5007 45.307 63.1325 45.261 63.7674 45.2472C67.4806 45.1662 71.1344 46.188 74.2668 48.1836C77.3992 50.1792 79.8695 53.0588 81.3653 56.4583C82.8611 59.8578 83.3153 63.6245 82.6703 67.2822C82.0254 70.9398 80.3103 74.3241 77.742 77.007C75.1737 79.6899 71.8675 81.5509 68.2415 82.3548C64.6154 83.1587 60.8325 82.8692 57.3709 81.5231C53.9094 80.177 50.9248 77.8347 48.7945 74.7923C48.7569 74.7385 48.7201 74.6845 48.6841 74.6301C46.7102 77.5135 43.9689 79.7914 40.7666 81.2038C37.4313 82.6748 33.74 83.1432 30.1431 82.552C26.5461 81.9608 23.199 80.3355 20.5101 77.8744C17.8211 75.4132 15.9066 72.2227 15.0001 68.692C14.0936 65.1613 14.2343 61.4431 15.405 57.991C16.5757 54.5389 18.7259 51.5022 21.5931 49.2513C24.4604 47.0004 27.9207 45.6326 31.5521 45.3149C32.1557 45.2621 32.7488 45.2824 33.3228 45.3683C32.9109 44.8309 32.527 44.2698 32.1734 43.6871C30.2467 40.5119 29.3047 36.8366 29.4667 33.1261C29.6287 29.4156 30.8874 25.8364 33.0836 22.8413C35.2797 19.8461 38.3147 17.5694 41.8048 16.2991Z"
        fill="#C5C5C5"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.4494 38.7118C59.3921 36.6901 59.7142 34.4342 59.3749 32.2295C59.0355 30.0248 58.05 27.9702 56.543 26.3255C55.0359 24.6809 53.0751 23.5201 50.9083 22.9898C48.7415 22.4596 46.4662 22.5839 44.37 23.3468C42.2739 24.1098 40.451 25.4771 39.132 27.2761C37.8129 29.075 37.057 31.2247 36.9597 33.4533C36.8624 35.6818 37.4281 37.8892 38.5853 39.7963C39.5791 41.4339 40.9707 42.787 42.6244 43.7336C43.0706 43.989 43.2642 44.5476 43.0279 45.0042L33.1895 64.0215"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32.2058 52.7864C30.0248 52.9772 27.9465 53.7987 26.2244 55.1506C24.5023 56.5025 23.2109 58.3264 22.5077 60.3998C21.8046 62.4731 21.7201 64.7063 22.2645 66.8269C22.809 68.9475 23.9589 70.8637 25.5739 72.3419C27.1889 73.8201 29.1992 74.7963 31.3596 75.1513C33.5199 75.5064 35.7369 75.2251 37.7401 74.3416C39.7433 73.4581 41.446 72.0107 42.6406 70.176C43.6699 68.5951 44.2836 66.7855 44.4321 64.9145C44.4716 64.4158 44.8734 64.0094 45.3736 64.0098L63.2651 64.0222"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M54.9382 70.4905C56.2177 72.3177 58.0103 73.7246 60.0893 74.5331C62.1683 75.3415 64.4404 75.5154 66.6182 75.0326C68.7961 74.5498 70.7818 73.432 72.3244 71.8206C73.8669 70.2092 74.897 68.1766 75.2844 65.9798C75.6717 63.783 75.3989 61.5207 74.5005 59.4789C73.6021 57.4371 72.1184 55.7076 70.2371 54.509C68.3557 53.3105 66.1612 52.6967 63.9311 52.7454C62.0647 52.7861 60.2436 53.2892 58.6281 54.2021C58.1355 54.4805 57.4916 54.3069 57.2573 53.7919L48.2268 33.9451"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.Webhook = LargeIconWebhook;

function AddWebhook({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.562 5.37792C10.7605 4.9523 10.8283 4.47739 10.7569 4.01323C10.6854 3.54908 10.4779 3.11653 10.1607 2.77029C9.8434 2.42405 9.43058 2.17967 8.97442 2.06805C8.51826 1.95642 8.03924 1.98258 7.59795 2.1432C7.15665 2.30382 6.77289 2.59169 6.4952 2.97041C6.21751 3.34913 6.05836 3.8017 6.03787 4.27087C6.01739 4.74004 6.13649 5.20475 6.38011 5.60624C6.45944 5.73695 6.5508 5.85906 6.65264 5.97115C6.99838 6.35169 7.20974 6.90687 6.97349 7.36353L5.24414 10.7063"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M5.03691 8.34082C4.57774 8.381 4.1402 8.55394 3.77765 8.83855C3.41511 9.12316 3.14324 9.50714 2.9952 9.94364C2.84717 10.3801 2.82938 10.8503 2.94401 11.2967C3.05863 11.7432 3.30071 12.1466 3.64071 12.4578C3.98071 12.769 4.40393 12.9745 4.85875 13.0492C5.31356 13.124 5.7803 13.0648 6.20202 12.8788C6.62374 12.6928 6.98221 12.388 7.2337 12.0018C7.31909 11.8706 7.39089 11.732 7.44846 11.5881C7.63424 11.1236 8.02429 10.7038 8.52451 10.7041L11.5757 10.7063"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path
        d="M9.82293 12.0682C10.0923 12.4529 10.4697 12.749 10.9074 12.9192C11.3451 13.0895 11.8234 13.1261 12.2819 13.0244C12.7404 12.9228 13.1584 12.6874 13.4832 12.3482C13.8079 12.009 14.0248 11.5811 14.1063 11.1186C14.1879 10.6561 14.1305 10.1798 13.9413 9.74995C13.7522 9.3201 13.4398 8.95599 13.0437 8.70366C12.6477 8.45134 12.1857 8.32213 11.7162 8.33237C11.6123 8.33464 11.5091 8.34371 11.4072 8.35937C10.8479 8.44535 10.1897 8.28569 9.95533 7.77068L8.41001 4.37442"
        stroke={stroke}
        strokeLinecap="round"
      />
      <path d="M2.33333 3V5.66667" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.66667 4.33333H1" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.AddWebhook = AddWebhook;

function Webhook({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1997 6.04467C10.3982 5.61905 10.466 5.14414 10.3946 4.67998C10.3231 4.21583 10.1156 3.78328 9.79837 3.43704C9.4811 3.0908 9.06828 2.84642 8.61212 2.73479C8.15596 2.62317 7.67694 2.64933 7.23564 2.80994C6.79434 2.97056 6.41058 3.25844 6.13289 3.63716C5.8552 4.01588 5.69605 4.46844 5.67557 4.93762C5.65508 5.40679 5.77418 5.8715 6.01781 6.27299C6.09713 6.4037 6.18849 6.52581 6.29033 6.6379C6.63608 7.01843 6.84744 7.57362 6.61119 8.03028L4.88184 11.373"
        strokeLinecap="round"
      />
      <path
        d="M4.6746 9.00757C4.21544 9.04774 3.7779 9.22069 3.41535 9.5053C3.0528 9.78991 2.78093 10.1739 2.6329 10.6104C2.48487 11.0469 2.46708 11.517 2.5817 11.9635C2.69632 12.4099 2.9384 12.8133 3.2784 13.1245C3.61841 13.4357 4.04163 13.6412 4.49644 13.716C4.95126 13.7907 5.41799 13.7315 5.83972 13.5455C6.26144 13.3595 6.61991 13.0548 6.8714 12.6685C6.95678 12.5374 7.02858 12.3988 7.08616 12.2548C7.27193 11.7904 7.66198 11.3705 8.1622 11.3709L11.2134 11.373"
        strokeLinecap="round"
      />
      <path
        d="M9.46062 12.7349C9.72999 13.1196 10.1074 13.4158 10.5451 13.586C10.9828 13.7562 11.4611 13.7928 11.9196 13.6912C12.3781 13.5895 12.7961 13.3542 13.1209 13.015C13.4456 12.6757 13.6625 12.2478 13.744 11.7853C13.8256 11.3228 13.7681 10.8465 13.579 10.4167C13.3899 9.98685 13.0775 9.62274 12.6814 9.37041C12.2854 9.11808 11.8234 8.98887 11.3539 8.99912C11.25 9.00139 11.1468 9.01045 11.0449 9.02612C10.4856 9.1121 9.82736 8.95244 9.59303 8.43742L8.0477 5.04116"
        strokeLinecap="round"
      />
    </svg>
  );
}
Icon.Webhook = Webhook;

function Sol({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="black" />
      <path
        d="M4.95947 9.89515C5.0149 9.83971 5.09113 9.80737 5.17198 9.80737H12.5036C12.6376 9.80737 12.7046 9.96907 12.6099 10.0638L11.1616 11.5121C11.1061 11.5675 11.0299 11.5999 10.9491 11.5999H3.61741C3.48343 11.5999 3.41644 11.4382 3.51115 11.3435L4.95947 9.89515Z"
        fill="url(#paint0_linear_889_107778)"
      />
      <path
        d="M4.95947 4.48768C5.01721 4.43224 5.09344 4.3999 5.17198 4.3999H12.5036C12.6376 4.3999 12.7046 4.5616 12.6099 4.6563L11.1616 6.10462C11.1061 6.16006 11.0299 6.1924 10.9491 6.1924H3.61741C3.48343 6.1924 3.41644 6.0307 3.51115 5.93599L4.95947 4.48768Z"
        fill="url(#paint1_linear_889_107778)"
      />
      <path
        d="M11.1616 7.1742C11.1061 7.11876 11.0299 7.08643 10.9491 7.08643H3.61741C3.48343 7.08643 3.41644 7.24812 3.51115 7.34283L4.95947 8.79114C5.0149 8.84658 5.09113 8.87892 5.17198 8.87892H12.5036C12.6376 8.87892 12.7046 8.71723 12.6099 8.62252L11.1616 7.1742Z"
        fill="url(#paint2_linear_889_107778)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_889_107778"
          x1="-13.104"
          y1="3.0397"
          x2="-13.2991"
          y2="12.8556"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FFA3" />
          <stop offset="1" stop-color="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_889_107778"
          x1="-15.3227"
          y1="1.8814"
          x2="-15.5178"
          y2="11.6973"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FFA3" />
          <stop offset="1" stop-color="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_889_107778"
          x1="-14.2204"
          y1="2.45697"
          x2="-14.4155"
          y2="12.2729"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FFA3" />
          <stop offset="1" stop-color="#DC1FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
CryptoIcon.Sol = Sol;

function ExternalLink({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.667 2H14.0003V5.33333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33301 6.66667L13.9997 2"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6667 9.33325V12.6666C12.6667 13.4033 12.07 13.9999 11.3333 13.9999H3.33333C2.59667 13.9999 2 13.4033 2 12.6666V4.66659C2 3.92992 2.59667 3.33325 3.33333 3.33325H6.66667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.ExternalLink = ExternalLink;

function Check({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3337 4.33325L6.00033 11.6666L2.66699 8.33325"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Check = Check;

function Calendar({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3337 1.66675V5.00008"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66667 1.66675V5.00008"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 7.49992H17.5" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8333 3.33325H4.16667C3.24583 3.33325 2.5 4.07909 2.5 4.99992V15.8333C2.5 16.7541 3.24583 17.4999 4.16667 17.4999H15.8333C16.7542 17.4999 17.5 16.7541 17.5 15.8333V4.99992C17.5 4.07909 16.7542 3.33325 15.8333 3.33325Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.84455 10.6075C5.72955 10.6075 5.63621 10.7008 5.63705 10.8158C5.63705 10.9308 5.73038 11.0242 5.84538 11.0242C5.96038 11.0242 6.05371 10.9308 6.05371 10.8158C6.05371 10.7008 5.96038 10.6075 5.84455 10.6075"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0106 10.6075C9.89556 10.6075 9.80223 10.7008 9.80306 10.8158C9.80306 10.9308 9.8964 11.0242 10.0114 11.0242C10.1264 11.0242 10.2197 10.9308 10.2197 10.8158C10.2197 10.7008 10.1264 10.6075 10.0106 10.6075"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1776 10.6075C14.0626 10.6075 13.9692 10.7008 13.9701 10.8158C13.9701 10.9308 14.0634 11.0242 14.1784 11.0242C14.2934 11.0242 14.3867 10.9308 14.3867 10.8158C14.3867 10.7008 14.2934 10.6075 14.1776 10.6075"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.84455 13.9408C5.72955 13.9408 5.63621 14.0341 5.63705 14.1491C5.63705 14.2641 5.73038 14.3574 5.84538 14.3574C5.96038 14.3574 6.05371 14.2641 6.05371 14.1491C6.05371 14.0341 5.96038 13.9408 5.84455 13.9408"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0106 13.9408C9.89556 13.9408 9.80223 14.0341 9.80306 14.1491C9.80306 14.2641 9.8964 14.3574 10.0114 14.3574C10.1264 14.3574 10.2197 14.2641 10.2197 14.1491C10.2197 14.0341 10.1264 13.9408 10.0106 13.9408"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Calendar = Calendar;

function Balance({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.50098 7.5C2.50098 8.42083 4.36598 9.16667 6.66764 9.16667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66681 12.4999C4.36598 12.4999 2.50098 11.7541 2.50098 10.8333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8323 4.16675H10.8331V6.66675"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16797 13.3333C9.16797 14.2541 11.033 14.9999 13.3346 14.9999C15.6363 14.9999 17.5013 14.2541 17.5013 13.3333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16797 10C9.16797 10.9208 11.033 11.6667 13.3346 11.6667C15.6363 11.6667 17.5013 10.9208 17.5013 10"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 8.33325C11.033 8.33325 9.1663 9.07909 9.16797 9.99992"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16797 10V16.6667C9.16797 17.5875 11.033 18.3333 13.3346 18.3333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 8.33325C15.633 8.33325 17.4997 9.07909 17.498 9.99992"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4997 10V16.6667C17.4997 17.5875 15.6347 18.3333 13.333 18.3333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66667 15.8334C4.36583 15.8334 2.5 15.0876 2.5 14.1667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66667 5.83333C8.96785 5.83333 10.8333 5.08714 10.8333 4.16667C10.8333 3.24619 8.96785 2.5 6.66667 2.5C4.36548 2.5 2.5 3.24619 2.5 4.16667C2.5 5.08714 4.36548 5.83333 6.66667 5.83333Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.49967 4.16675V14.1667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Balance = Balance;

function Help({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.99957"
        cy="8.00006"
        r="6.0025"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.45605 6.45654C6.61407 5.77551 7.23436 5.30331 7.93289 5.3323C8.71467 5.289 9.38486 5.88472 9.43351 6.66619C9.43351 7.66921 7.99958 8.00007 7.99958 8.66702"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.08383 10.501C8.08383 10.547 8.04651 10.5843 8.00046 10.5843C7.95442 10.5843 7.9171 10.547 7.9171 10.501C7.9171 10.4549 7.95442 10.4176 8.00046 10.4176"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9998 10.4178C8.04584 10.4178 8.08316 10.4551 8.08316 10.5011"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Help = Help;

function Close({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33301 5.33325L10.6663 10.6666"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6663 5.33325L5.33301 10.6666"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Close = Close;

function Resume({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5 8V8C15.5 12.1425 12.1425 15.5 8 15.5V15.5C3.8575 15.5 0.5 12.1425 0.5 8V8C0.5 3.8575 3.8575 0.5 8 0.5V0.5C12.1425 0.5 15.5 3.8575 15.5 8Z"
        stroke={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.Resume = Resume;

function Pause({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.33333 10V6" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66634 10V6" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 8V8C14 11.314 11.314 14 8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Pause = Pause;

function Add({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.3337 7.99992H4.66699" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.99967 11.3332V4.6665" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.Add = Add;

function ManageNfts({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.62933 14.6667H3.40733C2.63 14.6667 2 14.0367 2 13.2594V6.22203C2 5.4447 2.63 4.8147 3.40733 4.8147H7.62933C8.40667 4.8147 9.03667 5.4447 9.03667 6.22203V13.2594C9.03733 14.0367 8.40667 14.6667 7.62933 14.6667Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50098 4.81468L7.15364 2.37668C7.35498 1.62601 8.12698 1.18001 8.87764 1.38135L12.9556 2.47401C13.7063 2.67535 14.1523 3.44668 13.951 4.19801L12.1296 10.9953C11.9283 11.746 11.157 12.192 10.4063 11.9907L9.03631 11.624"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.ManageNfts = ManageNfts;

function Customers({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.17818 7.32141C9.82906 7.97228 9.82906 9.02755 9.17818 9.67843C8.52731 10.3293 7.47204 10.3293 6.82116 9.67843C6.17029 9.02755 6.17029 7.97228 6.82116 7.32141C7.47204 6.67053 8.52731 6.67053 9.17818 7.32141"
        stroke={stroke}
        fill="#C5C5C5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8354 3.32141C13.4863 3.97228 13.4863 5.02755 12.8354 5.67843C12.1845 6.3293 11.1293 6.3293 10.4784 5.67843C9.82752 5.02755 9.82752 3.97228 10.4784 3.32141C11.1293 2.67053 12.1845 2.67053 12.8354 3.32141"
        stroke={stroke}
        fill="#C5C5C5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.16675C13.022 8.16675 14 8.52208 14.6667 9.05541"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.52096 3.32141C6.17183 3.97228 6.17183 5.02755 5.52096 5.67843C4.87008 6.3293 3.81481 6.3293 3.16394 5.67843C2.51306 5.02755 2.51306 3.97228 3.16394 3.32141C3.81481 2.67053 4.87008 2.67053 5.52096 3.32141"
        stroke={stroke}
        fill="#C5C5C5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.33301 9.05541C1.99967 8.52208 2.97767 8.16675 3.99967 8.16675"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0608 13.1667C10.2841 12.5661 9.16812 12.1667 8.00012 12.1667C6.83212 12.1667 5.71612 12.5661 4.93945 13.1667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Customers = Customers;

function Treasury({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.355 8.3113C11.367 8.3233 11.367 8.34263 11.355 8.35463C11.343 8.36663 11.3237 8.36663 11.3117 8.35463C11.2997 8.34263 11.2997 8.3233 11.3117 8.3113C11.3237 8.2993 11.3437 8.29997 11.355 8.3113"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.77434 4.98541C9.91501 4.68475 9.99967 4.35341 9.99967 4.00008C9.99967 2.71141 8.95501 1.66675 7.66634 1.66675C6.37767 1.66675 5.33301 2.71141 5.33301 4.00008C5.33301 4.41541 5.45034 4.80008 5.64101 5.13741"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.52533 7C1.21267 7.182 1 7.51733 1 7.90533C1 8.486 1.47067 8.95667 2.05133 8.95667H2.66667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3337 4.33325V6.03592C12.8123 6.46792 13.1923 7.00659 13.4177 7.62325H14.0003C14.3683 7.62325 14.667 7.92192 14.667 8.28992V10.3333C14.667 10.7013 14.3683 10.9999 14.0003 10.9999H13.1263C12.7763 11.6053 12.271 12.1093 11.667 12.4606V13.6666C11.667 14.0346 11.3683 14.3333 11.0003 14.3333H9.66699C9.29899 14.3333 9.00033 14.0346 9.00033 13.6666V12.9999H6.66699V13.5786C6.66699 13.9466 6.36833 14.2453 6.00033 14.2453H4.66699C4.29899 14.2453 4.00033 13.9466 4.00033 13.5786V11.9753C3.18366 11.2426 2.66699 10.1833 2.66699 8.99992C2.66699 6.79059 4.45766 4.99992 6.66699 4.99992H9.68433C9.97033 4.99992 10.2477 4.90592 10.4757 4.73392C10.8083 4.48325 11.219 4.33325 11.667 4.33325H12.3337V4.33325Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Treasury = Treasury;

function CreateNft({
  width = 96,
  height = 96,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.4678 34.0582L44.2905 23.5139C45.1613 20.2672 48.5002 18.3383 51.7468 19.2091L69.3841 23.9348C72.6308 24.8056 74.5597 28.1416 73.6889 31.3911L65.8117 60.7895C64.9409 64.0361 61.6049 65.9651 58.3583 65.0943L52.4331 63.5085"
        fill="#555555"
      />
      <path
        d="M57.0049 36.2273L53.7366 48.4245"
        stroke="#7B7B7B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M49.2721 40.6918L61.4694 43.96"
        stroke="#7B7B7B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.3468 76.6679H28.0867C24.7247 76.6679 22 73.9431 22 70.5812V40.1448C22 36.7828 24.7247 34.0581 28.0867 34.0581H46.3468C49.7088 34.0581 52.4335 36.7828 52.4335 40.1448V70.5812C52.4364 73.9431 49.7088 76.6679 46.3468 76.6679Z"
        fill="#C5C5C5"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.627 49.5184V62.146"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.3132 55.8322H43.9407"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.CreateNft = CreateNft;

function Info({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99966 5.33341C7.90766 5.33341 7.83299 5.40808 7.83366 5.50008C7.83366 5.59208 7.90833 5.66675 8.00033 5.66675C8.09233 5.66675 8.16699 5.59208 8.16699 5.50008C8.16699 5.40808 8.09233 5.33341 7.99966 5.33341"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8V8C14 11.314 11.314 14 8 14Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.00033 8V11.3333" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.Info = Info;

function TableSortDesc({ width = 16, height = 16, fill = '#7B7B7B', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 3L10.5981 6.75H5.40192L8 3Z" fill={fill} />
      <path d="M8 13L10.5981 9.25H5.40192L8 13Z" fill="black" />
    </svg>
  );
}
Icon.TableSortDesc = TableSortDesc;

function TableSortAsc({ width = 16, height = 16, fill = '#7B7B7B', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 3L10.5981 6.75H5.40192L8 3Z" fill="black" />
      <path d="M8 13L10.5981 9.25H5.40192L8 13Z" fill={fill} />
    </svg>
  );
}
Icon.TableSortAsc = TableSortAsc;

function TableSort({ width = 16, height = 16, fill = '#7B7B7B', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 3L10.5981 6.75H5.40192L8 3Z" fill={fill} />
      <path d="M8 13L10.5981 9.25H5.40192L8 13Z" fill={fill} />
    </svg>
  );
}
Icon.TableSort = TableSort;

function Edit({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.52834 10.413L10.4123 3.52898C10.6723 3.26898 11.0943 3.26898 11.3543 3.52898L12.4717 4.64632C12.7317 4.90632 12.7317 5.32832 12.4717 5.58832L5.58701 12.4717C5.46234 12.597 5.29301 12.667 5.11634 12.667H3.33301V10.8837C3.33301 10.707 3.40301 10.5377 3.52834 10.413Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16699 4.77344L11.227 6.83344"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Edit = Edit;

function TransferTokens({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.33203 1.66406L5.33245 2.66448L4.33203 3.6649"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33179 2.66455H3.9979C2.89287 2.66455 1.99707 3.56035 1.99707 4.66538"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6684 14.336L10.668 13.3356L11.6684 12.3352"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.668 13.3356H12.0019C13.1069 13.3356 14.0027 12.4397 14.0027 11.3347"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33226 13.3357C4.30637 13.3357 2.66406 11.6934 2.66406 9.66746C2.66406 7.64157 4.30637 5.99927 6.33226 5.99927C8.35814 5.99927 10.0005 7.64157 10.0005 9.66746C10.0005 10.6403 9.61398 11.5733 8.92606 12.2613C8.23814 12.9492 7.30512 13.3357 6.33226 13.3357"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.79154 8.98632L6.33243 8.44409V10.6103"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.79297 10.6118H6.87196"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.07324 3.77361C8.50576 2.34109 10.8283 2.34109 12.2609 3.77361C13.6934 5.20613 13.6934 7.5287 12.2608 8.96122"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.TransferTokens = TransferTokens;

function Delete({
  width = 16,
  height = 16,
  fill = 'black',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.87402 2.74787C5.87402 2.60963 5.98609 2.49756 6.12434 2.49756H9.8759C10.0141 2.49756 10.1262 2.60963 10.1262 2.74787V3.7485H5.87402V2.74787ZM6.12434 1.49756C5.43381 1.49756 4.87402 2.05734 4.87402 2.74787V3.74851H2.66406C2.38792 3.74851 2.16406 3.97237 2.16406 4.24851C2.16406 4.52465 2.38792 4.74851 2.66406 4.74851H3.03503L3.64325 12.6554C3.72343 13.6977 4.59259 14.5026 5.63798 14.5026H10.3619C11.4073 14.5026 12.2764 13.6977 12.3566 12.6554L12.9648 4.74851H13.3352C13.6113 4.74851 13.8352 4.52465 13.8352 4.24851C13.8352 3.97237 13.6113 3.74851 13.3352 3.74851H11.1262V2.74787C11.1262 2.05734 10.5664 1.49756 9.8759 1.49756H6.12434ZM10.3619 13.5026C10.8847 13.5026 11.3194 13.1 11.3595 12.5787L11.9619 4.74854H4.03799L4.64031 12.5787C4.68041 13.1 5.11512 13.5026 5.63798 13.5026H10.3619ZM6.62735 7.7721C6.81146 7.56629 7.12756 7.54871 7.33337 7.73282L7.96114 8.29441L8.52274 7.66663C8.70685 7.46083 9.02295 7.44324 9.22875 7.62735C9.43456 7.81146 9.45215 8.12756 9.26804 8.33337L8.70643 8.96115L9.3342 9.52274C9.54001 9.70685 9.55759 10.0229 9.37348 10.2288C9.18937 10.4346 8.87327 10.4521 8.66747 10.268L8.0397 9.70644L7.47812 10.3342C7.294 10.54 6.97791 10.5576 6.7721 10.3735C6.56629 10.1894 6.54871 9.87327 6.73282 9.66747L7.2944 9.03971L6.66663 8.47812C6.46083 8.294 6.44324 7.97791 6.62735 7.7721Z"
        fill={fill}
      />
    </svg>
  );
}
Icon.Delete = Delete;

function Email({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.9248 13.4234H11.7341L14.2154 10.9421C14.4656 10.6919 14.4656 10.2874 14.2154 10.0378L13.311 9.13348C13.0608 8.88324 12.6563 8.88324 12.4067 9.13348L9.92544 11.6148V13.4234H9.9248Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1169 7.04135V3.84839"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.35996 10.8814H3.52252C2.81596 10.8814 2.24316 10.3086 2.24316 9.60145V3.83057"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8307 2.54346H3.52859C2.81819 2.54346 2.24219 3.11946 2.24219 3.8305V3.8305C2.24219 4.25738 2.45339 4.6561 2.80667 4.89546L6.23387 7.2193C7.10747 7.8113 8.25307 7.8113 9.12667 7.2193L12.5526 4.8961C12.9059 4.65674 13.1171 4.25738 13.1171 3.83114V3.8305C13.1164 3.11946 12.5411 2.54346 11.8307 2.54346Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Email = Email;

function More({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99848 11.6682C7.81507 11.6682 7.66501 11.8183 7.66701 12.0017C7.66701 12.1851 7.81707 12.3352 8.00048 12.3352C8.18389 12.3352 8.33396 12.1851 8.33396 12.0017C8.33396 11.8183 8.18389 11.6682 7.99848 11.6682"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99848 7.6665C7.81507 7.6665 7.66501 7.81657 7.66701 7.99998C7.66701 8.18339 7.81707 8.33345 8.00048 8.33345C8.18389 8.33345 8.33396 8.18339 8.33396 7.99998C8.33396 7.81657 8.18389 7.6665 7.99848 7.6665"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99848 3.66479C7.81507 3.66479 7.66501 3.81486 7.66701 3.99827C7.66701 4.18168 7.81707 4.33174 8.00048 4.33174C8.18389 4.33174 8.33396 4.18168 8.33396 3.99827C8.33396 3.81486 8.18389 3.66479 7.99848 3.66479"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.More = More;

function TableAction({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5491 7.71669L8.54173 13.5054C8.17439 14.0354 7.34306 13.776 7.34306 13.1307V9.31536H3.99306C3.46239 9.31536 3.14973 8.71936 3.45239 8.28269L7.45973 2.49402C7.82706 1.96402 8.65839 2.22336 8.65839 2.86869V6.68402H12.0084C12.5384 6.68402 12.8511 7.28002 12.5491 7.71669Z"
        fill="#C5C5C5"
      />
    </svg>
  );
}
Icon.TableAction = TableAction;

function EmptyAvatar({ width = 32, height = 32, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#F5F5F5" />
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.2431 11.7573L11.7578 20.2427L20.2431 11.7573Z"
          stroke="#7B7B7B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 10V10C12.686 10 10 12.686 10 16V16C10 19.314 12.686 22 16 22V22C19.314 22 22 19.314 22 16V16C22 12.686 19.314 10 16 10Z"
          stroke="#7B7B7B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
Icon.EmptyAvatar = EmptyAvatar;

function InviteMember({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9997 13.3333V12.8333C11.9997 11.2685 10.7311 10 9.16634 10H4.16634C2.60153 10 1.33301 11.2685 1.33301 12.8333V13.3333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="6.66667"
        cy="4.66667"
        r="2.66667"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.6663 6V8.66667" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M13.9997 7.33333H11.333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.InviteMember = InviteMember;

function CheckBox({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#F5F5F5" />
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#C5C5C5" />
    </svg>
  );
}
Icon.CheckBox = CheckBox;

function CheckBoxChecked({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="4" fill="black" />
      <path
        d="M12 5.25L6.5 10.75L4 8.25"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
CheckBox.Checked = CheckBoxChecked;

function CheckBoxFilled({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="4" fill="black" />
      <path d="M4.25 8H11.75" stroke="white" strokeLinecap="round" />
    </svg>
  );
}
CheckBox.Filled = CheckBoxFilled;

function CreateProjectLarge({ width = 96, height = 96, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.25 34.5545H46.2807C47.3565 34.5545 48.364 34.0215 48.9685 33.131L53.5347 26.4198C54.1392 25.5325 55.1435 24.9995 56.2192 24.9995H70.75C74.3412 24.9995 77.25 27.9083 77.25 31.4995V67.4995C77.25 71.0908 74.3412 73.9995 70.75 73.9995H25.25C21.6588 73.9995 18.75 71.0908 18.75 67.4995V41.0545C18.75 37.4665 21.6588 34.5545 25.25 34.5545Z"
        fill="#555555"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.75 31.5546H49.7193C48.6435 31.5546 47.636 31.0216 47.0315 30.1311L42.4652 23.4199C41.8607 22.5326 40.8565 21.9996 39.7808 21.9996H25.25C21.6587 21.9996 18.75 24.9084 18.75 28.4996V67.4996C18.75 71.0909 21.6587 73.9996 25.25 73.9996H70.75C74.3413 73.9996 77.25 71.0909 77.25 67.4996V38.0546C77.25 34.4666 74.3413 31.5546 70.75 31.5546Z"
        fill="#C5C5C5"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.9688 43.5156V61.3906"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.0312 52.4531H56.9062"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.CreateProject = CreateProjectLarge;

function CreateProject({ width = 20, height = 20, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8333 5.78325H10.4408C10.165 5.78325 9.90667 5.64659 9.75167 5.41825L8.58083 3.69742C8.42583 3.46992 8.16833 3.33325 7.8925 3.33325H4.16667C3.24583 3.33325 2.5 4.07909 2.5 4.99992V14.9999C2.5 15.9208 3.24583 16.6666 4.16667 16.6666H15.8333C16.7542 16.6666 17.5 15.9208 17.5 14.9999V7.44992C17.5 6.52992 16.7542 5.78325 15.8333 5.78325Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.99186 8.8501V13.4334" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.7002 11.1418H12.2835" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.CreateProject = CreateProject;

function ChevronLeft({ width = 4, height = 8, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 4 8"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33366 1.33325L0.666992 3.99992L3.33366 6.66659"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.ChevronLeft = ChevronLeft;

function Settings({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.17818 6.82141C9.82906 7.47228 9.82906 8.52755 9.17818 9.17843C8.52731 9.8293 7.47204 9.8293 6.82116 9.17843C6.17029 8.52755 6.17029 7.47228 6.82116 6.82141C7.47204 6.17053 8.52731 6.17053 9.17818 6.82141"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.89943 2.74664L10.2881 2.87597C10.6441 2.99464 10.8848 3.32797 10.8848 3.7033V4.2613C10.8848 4.73597 11.2634 5.1233 11.7381 5.1333L12.2968 5.1453C12.6201 5.15197 12.9134 5.33797 13.0581 5.6273L13.2414 5.99397C13.4094 6.32997 13.3434 6.7353 13.0781 7.00064L12.6834 7.3953C12.3481 7.73064 12.3421 8.27264 12.6701 8.6153L13.0568 9.0193C13.2808 9.2533 13.3568 9.5913 13.2541 9.89864L13.1248 10.2873C13.0061 10.6433 12.6728 10.884 12.2974 10.884H11.7394C11.2648 10.884 10.8774 11.2626 10.8674 11.7373L10.8554 12.296C10.8488 12.6193 10.6628 12.9126 10.3734 13.0573L10.0068 13.2406C9.67077 13.4086 9.26543 13.3426 9.0001 13.0773L8.60543 12.6826C8.2701 12.3473 7.7281 12.3413 7.38543 12.6693L6.98143 13.056C6.74743 13.28 6.40943 13.356 6.1021 13.2533L5.71343 13.124C5.35743 13.0053 5.11677 12.672 5.11677 12.2966V11.7386C5.11677 11.264 4.7381 10.8766 4.26343 10.8666L3.70477 10.8546C3.38143 10.848 3.0881 10.662 2.94343 10.3726L2.7601 10.006C2.5921 9.66997 2.6581 9.26464 2.92343 8.9993L3.3181 8.60464C3.65343 8.2693 3.65943 7.7273 3.33143 7.38464L2.94477 6.98064C2.7201 6.74597 2.6441 6.4073 2.74677 6.10064L2.8761 5.71197C2.99477 5.35597 3.3281 5.1153 3.70343 5.1153H4.26143C4.7361 5.1153 5.12343 4.73664 5.13343 4.26197L5.14543 3.7033C5.15343 3.37997 5.33877 3.08664 5.6281 2.94197L5.99477 2.75864C6.33077 2.59064 6.7361 2.65664 7.00143 2.92197L7.3961 3.31664C7.73143 3.65197 8.27343 3.65797 8.6161 3.32997L9.0201 2.9433C9.2541 2.71997 9.59277 2.64397 9.89943 2.74664V2.74664Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Settings = Settings;

function Members({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6663 13.3333V12.6667C10.6663 11.1939 9.47243 10 7.99967 10H3.99967C2.52692 10 1.33301 11.1939 1.33301 12.6667V13.3333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.99967" cy="4.66667" r="2.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M14.6667 13.3333V12.6667C14.6667 11.1939 13.4728 10 12 10V10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 2C11.4728 2 12.6667 3.19391 12.6667 4.66667C12.6667 6.13943 11.4728 7.33333 10 7.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Members = Members;

function Projects({ width = 14, height = 12, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 12"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3333 5.51479V3.96008C12.3333 3.2237 11.7364 2.62675 11 2.62675H7.35276C7.13209 2.62675 6.92571 2.51755 6.80157 2.3351L5.86491 0.958395C5.74077 0.775938 5.53438 0.666739 5.31369 0.666748H2.33333C1.59695 0.666748 1 1.2637 1 2.00008V10.2236C1 10.518 1.11692 10.8002 1.32505 11.0084C1.53317 11.2165 1.81544 11.3334 2.10977 11.3334V11.3334C2.62992 11.3334 3.08027 10.9721 3.19311 10.4644L4.10133 6.37751C4.2369 5.76747 4.77797 5.33343 5.40289 5.33341H11.6661C12.0706 5.33342 12.4531 5.51698 12.7062 5.83245C12.9592 6.14792 13.0554 6.56119 12.9677 6.95599L12.227 10.2893C12.0914 10.8994 11.5503 11.3334 10.9254 11.3334H2.10977"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.Projects = Projects;

function CheckInCircle({ width = 96, height = 96, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="96" height="96" rx="48" fill="#479E5A" />
      <path
        d="M56 42.5L45 53.5L40 48.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.CheckInCircle = CheckInCircle;

function EmailInCircle({ width = 96, height = 96, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="96" height="96" rx="48" fill="black" />
      <path
        d="M46.25 45.2501L49.75 45.2499"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.216 39.4121L56.216 44.7726C56.7102 45.151 57 45.738 57 46.3605L56.9999 54C56.9999 55.6569 55.6568 57 53.9999 57H42C40.3431 57 39 55.6569 39 54V46.3605C39 45.738 39.2898 45.151 39.784 44.7726L46.784 39.4121C47.5015 38.8626 48.4985 38.8626 49.216 39.4121Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.8899 45.7111L49.2156 51.5878C48.4981 52.1373 47.5012 52.1373 46.7837 51.5878L39.1094 45.7111"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Icon.EmailInCircle = EmailInCircle;

function ArrowRight({
  width = 16,
  height = 16,
  fill = 'none',
  className = '',
  stroke = 'black',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.6663 8.00008H3.33301" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33301 11.3333L12.6663 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33301 4.66675L12.6663 8.00008" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.ArrowRight = ArrowRight;

function LightBulb({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-subtletext', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.2427 3.09069L11.8185 3.51495" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.9995 7.33333H13.3995" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.60013 7.33333H2.00013" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.18121 3.51495L3.75695 3.09068" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.00033 1.93338V1.33338" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.99959 4.33328C6.56676 4.32784 5.29201 5.24205 4.83763 6.60094C4.38325 7.95983 4.85171 9.45693 5.99963 10.3144"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4.33328C9.43282 4.32783 10.7076 5.24201 11.1619 6.60088C11.6163 7.95975 11.1479 9.45683 10 10.3144"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.3145V11.3334C6 11.7016 6.29848 12 6.66667 12H9.33333C9.70152 12 10 11.7016 10 11.3334V10.3145"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.33301 14.0001H9.66634" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
Icon.LightBulb = LightBulb;

function ShowPasswordIcon({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-black', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.70514 9.03858C9.27877 9.75749 8.45061 10.1358 7.62805 9.98746C6.80549 9.83911 6.16168 9.1953 6.01333 8.37274C5.86497 7.55018 6.2433 6.72202 6.96221 6.29565"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9973 11.3309C10.8474 12.203 9.44277 12.6731 7.99956 12.6687C5.60816 12.7113 3.39859 11.397 2.29452 9.2753C1.89792 8.47142 1.89792 7.52878 2.29452 6.7249C2.84668 5.62531 3.72688 4.72447 4.81338 4.14697"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6185 9.42294C13.6453 9.37225 13.6801 9.32678 13.7054 9.27513C14.102 8.47125 14.102 7.52861 13.7054 6.72473C12.6013 4.60302 10.3917 3.28874 8.00031 3.33133C7.85038 3.33133 7.70465 3.35134 7.55664 3.36109"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.0021 13.3356L2.66406 1.99756" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Icon.ShowPassword = ShowPasswordIcon;

function HidePasswordIcon({ width = 16, height = 16, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      className={clsx('stroke-black', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.41452 6.5865C10.1952 7.36717 10.1952 8.6345 9.41452 9.4165C8.63386 10.1972 7.36652 10.1972 6.58452 9.4165C5.80386 8.63583 5.80386 7.3685 6.58452 6.5865C7.36652 5.8045 8.63319 5.8045 9.41452 6.5865"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 7.99992C2 7.56059 2.10133 7.12592 2.29733 6.72525V6.72525C3.30733 4.66059 5.53933 3.33325 8 3.33325C10.4607 3.33325 12.6927 4.66059 13.7027 6.72525V6.72525C13.8987 7.12592 14 7.56059 14 7.99992C14 8.43925 13.8987 8.87392 13.7027 9.27458V9.27458C12.6927 11.3393 10.4607 12.6666 8 12.6666C5.53933 12.6666 3.30733 11.3393 2.29733 9.27458V9.27458C2.10133 8.87392 2 8.43925 2 7.99992Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Icon.HidePassword = HidePasswordIcon;

function ReceiveTokens({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 7.91659V5.41659C17.5 4.26599 16.5673 3.33325 15.4167 3.33325H4.58333C3.43274 3.33325 2.5 4.26599 2.5 5.41659V8.33325"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4997 12.0833V14.5833C17.4997 15.7338 16.5669 16.6666 15.4163 16.6666H10.833"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2503 7.91675H17.5003C17.9606 7.91675 18.3337 8.28984 18.3337 8.75008V11.2501C18.3337 11.7103 17.9606 12.0834 17.5003 12.0834H16.2503C15.0997 12.0834 14.167 11.1507 14.167 10.0001V10.0001C14.167 8.84949 15.0997 7.91675 16.2503 7.91675V7.91675Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 12L8.5 14L7 16" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 14H8" stroke={stroke} strokeLinecap="round" />
    </svg>
  );
}
Icon.ReceiveTokens = ReceiveTokens;

function AddWallet({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = 'black',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 7.91659V5.41659C17.5 4.26599 16.5673 3.33325 15.4167 3.33325H4.58333C3.43274 3.33325 2.5 4.26599 2.5 5.41659V8.33325"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4997 12.0833V14.5833C17.4997 15.7338 16.5669 16.6666 15.4163 16.6666H9.83301"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2503 7.91675H17.5003C17.9606 7.91675 18.3337 8.28984 18.3337 8.75008V11.2501C18.3337 11.7103 17.9606 12.0834 17.5003 12.0834H16.2503C15.0997 12.0834 14.167 11.1507 14.167 10.0001V10.0001C14.167 8.84949 15.0997 7.91675 16.2503 7.91675V7.91675Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 11.5V16.5" stroke={stroke} strokeLinecap="round" />
      <path d="M2.5 14H7.5" stroke={stroke} strokeLinecap="round" />
    </svg>
  );
}
Icon.AddWallet = AddWallet;

function LargeTreasuryIcon({ width = 96, height = 96, fill = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.124 30.1254V38.4259C71.4575 40.5319 73.31 43.1579 74.4085 46.1641H77.249C79.043 46.1641 80.499 47.6201 80.499 49.4141V59.3754C80.499 61.1694 79.043 62.6254 77.249 62.6254H72.9883C71.282 65.5764 68.8185 68.0334 65.874 69.7461V75.6254C65.874 77.4194 64.418 78.8754 62.624 78.8754H56.124C54.33 78.8754 52.874 77.4194 52.874 75.6254V72.3754H41.499V75.1964C41.499 76.9904 40.043 78.4464 38.249 78.4464H31.749C29.955 78.4464 28.499 76.9904 28.499 75.1964V67.3801C24.5178 63.8084 21.999 58.6441 21.999 52.8754C21.999 42.1049 30.7285 33.3754 41.499 33.3754H56.2085C57.6028 33.3754 58.9548 32.9171 60.0663 32.0786C61.688 30.8566 63.69 30.1254 65.874 30.1254H69.124V30.1254Z"
        fill="#C5C5C5"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.3556 49.5178C64.4141 49.5763 64.4141 49.6705 64.3556 49.729C64.2971 49.7875 64.2029 49.7875 64.1444 49.729C64.0859 49.6705 64.0859 49.5763 64.1444 49.5178C64.2029 49.4593 64.3004 49.4625 64.3556 49.5178"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.6525 33.3033C57.3382 31.8375 57.751 30.2223 57.751 28.4998C57.751 22.2175 52.6582 17.1248 46.376 17.1248C40.0937 17.1248 35.001 22.2175 35.001 28.4998C35.001 30.5245 35.573 32.3998 36.5025 34.0443"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.436 43.125C14.9118 44.0123 13.875 45.647 13.875 47.5385C13.875 50.3693 16.1695 52.6637 19.0003 52.6637H22"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.Treasury = LargeTreasuryIcon;

function LargeCreateCustomersIcon({
  width = 96,
  height = 96,
  fill = 'none',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.7438 44.6923C56.9168 47.8653 56.9168 53.0097 53.7438 56.1827C50.5708 59.3557 45.4263 59.3557 42.2533 56.1827C39.0803 53.0097 39.0803 47.8653 42.2533 44.6923C45.4263 41.5192 50.5708 41.5192 53.7438 44.6923Z"
        fill="#C5C5C5"
      />
      <path
        d="M53.7438 44.6923C56.9168 47.8653 56.9168 53.0097 53.7438 56.1827C50.5708 59.3557 45.4263 59.3557 42.2533 56.1827C39.0803 53.0097 39.0803 47.8653 42.2533 44.6923C45.4263 41.5192 50.5708 41.5192 53.7438 44.6923"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.5726 25.1923C74.7456 28.3653 74.7456 33.5097 71.5726 36.6827C68.3996 39.8557 63.2552 39.8557 60.0822 36.6827C56.9091 33.5097 56.9091 28.3653 60.0822 25.1923C63.2552 22.0192 68.3996 22.0192 71.5726 25.1923Z"
        fill="#C5C5C5"
      />
      <path
        d="M71.5726 25.1923C74.7456 28.3653 74.7456 33.5097 71.5726 36.6827C68.3996 39.8557 63.2552 39.8557 60.0822 36.6827C56.9091 33.5097 56.9091 28.3653 60.0822 25.1923C63.2552 22.0192 68.3996 22.0192 71.5726 25.1923"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M67.5 48.8125C72.4822 48.8125 77.25 50.5448 80.5 53.1448"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.9147 25.1923C39.0877 28.3653 39.0877 33.5097 35.9147 36.6827C32.7417 39.8557 27.5972 39.8557 24.4242 36.6827C21.2512 33.5097 21.2512 28.3653 24.4242 25.1923C27.5972 22.0192 32.7417 22.0192 35.9147 25.1923Z"
        fill="#C5C5C5"
      />
      <path
        d="M35.9147 25.1923C39.0877 28.3653 39.0877 33.5097 35.9147 36.6827C32.7417 39.8557 27.5972 39.8557 24.4242 36.6827C21.2512 33.5097 21.2512 28.3653 24.4242 25.1923C27.5972 22.0192 32.7417 22.0192 35.9147 25.1923"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4985 53.1448C18.7485 50.5448 23.5163 48.8125 28.4985 48.8125"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62.9213 73.1875C59.1351 70.2592 53.6946 68.3125 48.0006 68.3125C42.3066 68.3125 36.8661 70.2592 33.0798 73.1875"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}

LargeIcon.CreateCustomers = LargeCreateCustomersIcon;

function LargeClipboardIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60.334 26.417H66.5007C69.9064 26.417 72.6673 29.1779 72.6673 32.5837V69.5837C72.6673 72.9894 69.9064 75.7503 66.5007 75.7503H29.5007C26.0949 75.7503 23.334 72.9894 23.334 69.5837V32.5837C23.334 29.1779 26.0949 26.417 29.5007 26.417H35.6673"
        fill="#C5C5C5"
      />
      <path
        d="M60.334 26.417H66.5007C69.9064 26.417 72.6673 29.1779 72.6673 32.5837V69.5837C72.6673 72.9894 69.9064 75.7503 66.5007 75.7503H29.5007C26.0949 75.7503 23.334 72.9894 23.334 69.5837V32.5837C23.334 29.1779 26.0949 26.417 29.5007 26.417H35.6673"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.834 47L55.1673 61.3333"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.834 61.3333L55.1673 47"
        stroke="#555555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="35.6663" y="20.25" width="24.6667" height="12.3333" rx="4" fill="#555555" />
      <rect x="0.5" y="0.5" width="95" height="95" rx="7.5" stroke="#E6E6E6" />
    </svg>
  );
}
LargeIcon.Clipboard = LargeClipboardIcon;
