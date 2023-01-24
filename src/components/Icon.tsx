export interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

export function Icon() {
  return <div></div>;
}

function ChevronLeft({ width = 4, height = 8, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 4 8"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33366 1.33325L0.666992 3.99992L3.33366 6.66659"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.ChevronLeft = ChevronLeft;

function Settings({ width = 16, height = 16, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.17818 6.82141C9.82906 7.47228 9.82906 8.52755 9.17818 9.17843C8.52731 9.8293 7.47204 9.8293 6.82116 9.17843C6.17029 8.52755 6.17029 7.47228 6.82116 6.82141C7.47204 6.17053 8.52731 6.17053 9.17818 6.82141"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.89943 2.74664L10.2881 2.87597C10.6441 2.99464 10.8848 3.32797 10.8848 3.7033V4.2613C10.8848 4.73597 11.2634 5.1233 11.7381 5.1333L12.2968 5.1453C12.6201 5.15197 12.9134 5.33797 13.0581 5.6273L13.2414 5.99397C13.4094 6.32997 13.3434 6.7353 13.0781 7.00064L12.6834 7.3953C12.3481 7.73064 12.3421 8.27264 12.6701 8.6153L13.0568 9.0193C13.2808 9.2533 13.3568 9.5913 13.2541 9.89864L13.1248 10.2873C13.0061 10.6433 12.6728 10.884 12.2974 10.884H11.7394C11.2648 10.884 10.8774 11.2626 10.8674 11.7373L10.8554 12.296C10.8488 12.6193 10.6628 12.9126 10.3734 13.0573L10.0068 13.2406C9.67077 13.4086 9.26543 13.3426 9.0001 13.0773L8.60543 12.6826C8.2701 12.3473 7.7281 12.3413 7.38543 12.6693L6.98143 13.056C6.74743 13.28 6.40943 13.356 6.1021 13.2533L5.71343 13.124C5.35743 13.0053 5.11677 12.672 5.11677 12.2966V11.7386C5.11677 11.264 4.7381 10.8766 4.26343 10.8666L3.70477 10.8546C3.38143 10.848 3.0881 10.662 2.94343 10.3726L2.7601 10.006C2.5921 9.66997 2.6581 9.26464 2.92343 8.9993L3.3181 8.60464C3.65343 8.2693 3.65943 7.7273 3.33143 7.38464L2.94477 6.98064C2.7201 6.74597 2.6441 6.4073 2.74677 6.10064L2.8761 5.71197C2.99477 5.35597 3.3281 5.1153 3.70343 5.1153H4.26143C4.7361 5.1153 5.12343 4.73664 5.13343 4.26197L5.14543 3.7033C5.15343 3.37997 5.33877 3.08664 5.6281 2.94197L5.99477 2.75864C6.33077 2.59064 6.7361 2.65664 7.00143 2.92197L7.3961 3.31664C7.73143 3.65197 8.27343 3.65797 8.6161 3.32997L9.0201 2.9433C9.2541 2.71997 9.59277 2.64397 9.89943 2.74664V2.74664Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.Settings = Settings;

function Members({ width = 16, height = 16, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6663 13.3333V12.6667C10.6663 11.1939 9.47243 10 7.99967 10H3.99967C2.52692 10 1.33301 11.1939 1.33301 12.6667V13.3333"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="5.99967"
        cy="4.66667"
        r="2.66667"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6667 13.3333V12.6667C14.6667 11.1939 13.4728 10 12 10V10"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 2C11.4728 2 12.6667 3.19391 12.6667 4.66667C12.6667 6.13943 11.4728 7.33333 10 7.33333"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.Members = Members;

function Projects({ width = 14, height = 12, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 12"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3333 5.51479V3.96008C12.3333 3.2237 11.7364 2.62675 11 2.62675H7.35276C7.13209 2.62675 6.92571 2.51755 6.80157 2.3351L5.86491 0.958395C5.74077 0.775938 5.53438 0.666739 5.31369 0.666748H2.33333C1.59695 0.666748 1 1.2637 1 2.00008V10.2236C1 10.518 1.11692 10.8002 1.32505 11.0084C1.53317 11.2165 1.81544 11.3334 2.10977 11.3334V11.3334C2.62992 11.3334 3.08027 10.9721 3.19311 10.4644L4.10133 6.37751C4.2369 5.76747 4.77797 5.33343 5.40289 5.33341H11.6661C12.0706 5.33342 12.4531 5.51698 12.7062 5.83245C12.9592 6.14792 13.0554 6.56119 12.9677 6.95599L12.227 10.2893C12.0914 10.8994 11.5503 11.3334 10.9254 11.3334H2.10977"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.Projects = Projects;

function CheckInCircle({ width = 96, height = 96, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="96" height="96" rx="48" fill="#479E5A" />
      <path
        d="M56 42.5L45 53.5L40 48.5"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.CheckInCircle = CheckInCircle;

function EmailInCircle({ width = 96, height = 96, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="96" height="96" rx="48" fill="black" />
      <path
        d="M46.25 45.2501L49.75 45.2499"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M49.216 39.4121L56.216 44.7726C56.7102 45.151 57 45.738 57 46.3605L56.9999 54C56.9999 55.6569 55.6568 57 53.9999 57H42C40.3431 57 39 55.6569 39 54V46.3605C39 45.738 39.2898 45.151 39.784 44.7726L46.784 39.4121C47.5015 38.8626 48.4985 38.8626 49.216 39.4121Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M56.8899 45.7111L49.2156 51.5878C48.4981 52.1373 47.5012 52.1373 46.7837 51.5878L39.1094 45.7111"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.EmailInCircle = EmailInCircle;

function ArrowRight({
  width = 16,
  height = 16,
  color = 'currentColor',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6663 8.00008H3.33301"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.33301 11.3333L12.6663 8"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.33301 4.66675L12.6663 8.00008"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.ArrowRight = ArrowRight;

function LightBulb({ width = 16, height = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2427 3.09069L11.8185 3.51495"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.9995 7.33333H13.3995"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.60013 7.33333H2.00013"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.18121 3.51495L3.75695 3.09068"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.00033 1.93338V1.33338"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.99959 4.33328C6.56676 4.32784 5.29201 5.24205 4.83763 6.60094C4.38325 7.95983 4.85171 9.45693 5.99963 10.3144"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 4.33328C9.43282 4.32783 10.7076 5.24201 11.1619 6.60088C11.6163 7.95975 11.1479 9.45683 10 10.3144"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 10.3145V11.3334C6 11.7016 6.29848 12 6.66667 12H9.33333C9.70152 12 10 11.7016 10 11.3334V10.3145"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.33301 14.0001H9.66634"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
Icon.LightBulb = LightBulb;

function ShowPasswordIcon({ width = 16, height = 16, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.70514 9.03858C9.27877 9.75749 8.45061 10.1358 7.62805 9.98746C6.80549 9.83911 6.16168 9.1953 6.01333 8.37274C5.86497 7.55018 6.2433 6.72202 6.96221 6.29565"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9973 11.3309C10.8474 12.203 9.44277 12.6731 7.99956 12.6687C5.60816 12.7113 3.39859 11.397 2.29452 9.2753C1.89792 8.47142 1.89792 7.52878 2.29452 6.7249C2.84668 5.62531 3.72688 4.72447 4.81338 4.14697"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.6185 9.42294C13.6453 9.37225 13.6801 9.32678 13.7054 9.27513C14.102 8.47125 14.102 7.52861 13.7054 6.72473C12.6013 4.60302 10.3917 3.28874 8.00031 3.33133C7.85038 3.33133 7.70465 3.35134 7.55664 3.36109"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.0021 13.3356L2.66406 1.99756"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

Icon.ShowPassword = ShowPasswordIcon;

function HidePasswordIcon({ width = 16, height = 16, color = 'none', className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.41452 6.5865C10.1952 7.36717 10.1952 8.6345 9.41452 9.4165C8.63386 10.1972 7.36652 10.1972 6.58452 9.4165C5.80386 8.63583 5.80386 7.3685 6.58452 6.5865C7.36652 5.8045 8.63319 5.8045 9.41452 6.5865"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 7.99992C2 7.56059 2.10133 7.12592 2.29733 6.72525V6.72525C3.30733 4.66059 5.53933 3.33325 8 3.33325C10.4607 3.33325 12.6927 4.66059 13.7027 6.72525V6.72525C13.8987 7.12592 14 7.56059 14 7.99992C14 8.43925 13.8987 8.87392 13.7027 9.27458V9.27458C12.6927 11.3393 10.4607 12.6666 8 12.6666C5.53933 12.6666 3.30733 11.3393 2.29733 9.27458V9.27458C2.10133 8.87392 2 8.43925 2 7.99992Z"
        stroke="black"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

Icon.HidePassword = HidePasswordIcon;
