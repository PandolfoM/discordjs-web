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

export type RoleProps = {
  name: string;
  permissions: string;
  color: number;
  hoist: boolean;
  icon?: ImageData | null;
  unicode_emoji?: string | null;
  mentionable: boolean;
};

export const defaultRole: RoleProps = {
  name: "new role",
  permissions: "@everyone permissions in guild",
  color: 0,
  hoist: false,
  icon: null,
  unicode_emoji: null,
  mentionable: false,
};

export const defaultChannels: ChannelProps = {
  id: "",
  type: 0,
  flags: 0,
  guild_id: "",
  name: "",
  parent_id: "",
  permission_overwrites: [
    {
      allow: 0,
      allow_new: "",
      deny: 0,
      deny_new: "",
      id: "",
      type: "",
    },
  ],
  position: 0,
  last_message_id: "",
  rate_limit_per_user: 0,
  topic: "",
  default_thread_rate_limit_per_user: 0,
  nsfw: false,
  icon_emoji: {
    id: "",
    name: "",
  },
  theme_color: 0,
  bitrate: 0,
  user_limit: 0,
  rtc_region: "",
};

export const defaultSettings: SettingsProps = {
  devChannel: "",
  djRole: "",
  musicChannel: "",
};
