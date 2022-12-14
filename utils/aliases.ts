const aliases: Record<string, string[]> = {
  darwin: ["mac", "macos", "osx"],
  // win32: ["windows32", "win"],
  win64: ["windows64", "windows"],
  // actually we bind all linux to appimage
  appimage: ["linux32", "linux64", "linux"],
  // Not supported yet
  exe: ["exe"],
  dmg: ["dmg"],
  deb: ["debian"],
  rpm: ["fedora"],
};

export default function (platform: string) {
  if (typeof aliases[platform] !== "undefined") {
    return platform;
  }

  for (const guess of Object.keys(aliases)) {
    const list = aliases[guess];

    if (list.includes(platform)) {
      return guess;
    }
  }

  return false;
}
