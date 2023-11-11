interface AnnouncementProps {
  account?: string;
  repository?: string;
  date?: string;
  version?: string;
  github: string;
}
export default function Announcement({
  account,
  repository,
  version,
  github,
}: AnnouncementProps) {
  return (
    <a
      class="bg-green-400 text-black border(b green-500) p-3 text-center group"
      href={github}
    >
      <b>{`${account}/${repository}@${version}`}</b>
      &nbsp;has been released!&nbsp;
      <span class="group-hover:underline">→</span>
    </a>
  );
}
