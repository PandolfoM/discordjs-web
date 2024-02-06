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
  color: number;
  description?: string | null;
  flags: number;
  hoist: boolean;
  icon?: ImageData | null;
  id: string;
  managed: boolean;
  mentionable: boolean;
  name: string;
  permissions: number;
  permissions_new: string;
  position: number;
  unicode_emoji?: string | null;
};

export const defaultRole: RoleProps = {
  color: 0,
  description: null,
  flags: 0,
  hoist: false,
  icon: null,
  id: "0",
  managed: false,
  mentionable: false,
  name: "@everyone",
  permissions: 0,
  permissions_new: "0",
  position: 0,
  unicode_emoji: null,
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
