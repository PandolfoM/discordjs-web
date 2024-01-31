export type ChannelProps = {
  id: string;
  type: number;
  flags: number;
  guild_id: string;
  name: string;
  parent_id: string | null;
  permission_overwrites: [
    {
      allow: number;
      allow_new: string;
      deny: number;
      deny_new: string;
      id: string;
      type: string;
    }
  ];
  position: number;
  last_message_id?: string | null;
  rate_limit_per_user: number;
  topic?: string | null;
  default_thread_rate_limit_per_user?: number;
  nsfw: boolean;
  icon_emoji: {
    id: string | null;
    name: string;
  };
  theme_color?: number | null;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string | null;
};

export type SettingsProps = {
  devChannel: string;
  djRole: string;
  musicChannel: string;
};

export const defaultSettings: SettingsProps = {
  devChannel: "",
  djRole: "",
  musicChannel: "",
};
