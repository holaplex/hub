'use client';
import { Icon } from '../../../../components/Icon';

export default function AlertsPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center mt-6">
        <Icon.Alert className="stroke-maintext" />
        <span className="mt-6 text-xl font-semibold">Alerts coming soon</span>
        <span className="text-gray-400 mt-5">
          Set up alerts to make sure you never run out of credits...
        </span>
      </div>
    </div>
  );
}
