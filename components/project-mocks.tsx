function Frame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-ink/10 bg-paper shadow-[0_24px_60px_-36px_rgba(44,51,40,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-2.5">
        <span className="size-2 rounded-full bg-[#c4a484]" />
        <span className="size-2 rounded-full bg-[#d2c36a]" />
        <span className="size-2 rounded-full bg-[#7f946c]" />
        <span className="ml-2 text-[11px] tracking-wide text-olive">{label}</span>
      </div>
      {children}
    </div>
  );
}

function UnidigifyMock() {
  return (
    <Frame label="unidigify — northwind / spring drop">
      <div className="grid md:grid-cols-[9.5rem_1fr_13rem]">
        <aside className="border-b border-ink/10 p-3 md:border-r md:border-b-0">
          <p className="px-2 text-[10px] uppercase tracking-[0.16em] text-olive">Brands</p>
          <ul className="mt-2 space-y-1 text-sm">
            {["Northwind", "Lumen", "Field & Co"].map((brand, index) => (
              <li
                key={brand}
                className={`rounded-lg px-2 py-1.5 ${index === 0 ? "bg-[#e7eadc]" : ""}`}
              >
                {brand}
              </li>
            ))}
          </ul>
        </aside>
        <div className="space-y-3 p-4">
          <p className="text-[11px] text-olive">Gemini 2.5 Pro · brand memory</p>
          <div className="ml-auto max-w-[16rem] rounded-2xl rounded-br-md bg-moss px-3 py-2 text-xs leading-5 text-paper">
            Write an Instagram post for the spring drop, in our voice.
          </div>
          <div className="max-w-[18rem] rounded-2xl border border-ink/10 bg-[#fbfaf6] p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-olive">Draft</p>
            <p className="mt-2 text-sm leading-5">
              Light, linen, and the first warm week. The spring drop is live — quiet colors, made to be worn on repeat.
            </p>
            <div className="mt-3 flex gap-2 text-[10px]">
              <span className="rounded-full bg-[#e7eadc] px-2 py-1">Save draft</span>
              <span className="rounded-full bg-[#e7eadc] px-2 py-1">Approve</span>
              <span className="rounded-full bg-moss px-2 py-1 text-paper">Publish</span>
            </div>
          </div>
        </div>
        <aside className="border-t border-ink/10 p-4 md:border-t-0 md:border-l">
          <div className="grid aspect-square place-items-center rounded-xl bg-[linear-gradient(160deg,#dfe3cf,#b7c3a4_55%,#8ea084)] text-center text-xs text-moss">
            1080 × 1080
            <br />
            AI image
          </div>
          <ul className="mt-3 space-y-1.5 text-[11px] text-olive">
            <li>Instagram · connected</li>
            <li>Facebook Pages · connected</li>
            <li>Google Ads · paused</li>
          </ul>
        </aside>
      </div>
    </Frame>
  );
}

function ScamDetectMock() {
  const rows = [
    ["SD-1842", "Phishing", "High", "Round-robin"],
    ["SD-1838", "Investment", "Medium", "Chennai"],
    ["SD-1831", "Job offer", "High", "Round-robin"],
    ["SD-1826", "Shopping", "Low", "Bengaluru"],
  ];

  return (
    <Frame label="scam detect — case desk">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Open", "24"],
            ["+35%", "Faster"],
            ["−40%", "Manual review"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-[#f3f1e8] px-3 py-2">
              <p className="font-serif text-xl">{value}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-olive">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/10">
          <div className="grid grid-cols-4 bg-[#eef0e4] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-olive">
            <span>Case</span>
            <span>Type</span>
            <span>Priority</span>
            <span>Route</span>
          </div>
          {rows.map((row) => (
            <div key={row[0]} className="grid grid-cols-4 border-t border-ink/10 px-3 py-2 text-xs">
              {row.map((cell, index) => (
                <span key={`${row[0]}-${index}`}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-olive">Keycloak · analyst access only</p>
      </div>
    </Frame>
  );
}

function HrdcMock() {
  const bars = [42, 68, 55, 80, 63, 90, 74];

  return (
    <Frame label="hrdc — nhrds reporting">
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_11rem]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-olive">Programs this quarter</p>
          <div className="mt-4 flex h-36 items-end gap-2">
            {bars.map((height) => (
              <div
                key={height}
                className="flex-1 rounded-t-md bg-[#8ea084]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-olive">
            <span>Apr</span>
            <span>Oct</span>
          </div>
        </div>
        <div className="space-y-2">
          {[
            ["128", "Programs"],
            ["1,042", "Reports"],
            ["18", "Regions"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-ink/10 px-3 py-2">
              <p className="font-serif text-2xl leading-none">{value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-olive">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function WorkSphereMock() {
  const columns = [
    {
      title: "To do",
      cards: ["Draft onboarding checklist", "Audit billing webhooks"],
    },
    {
      title: "In progress",
      cards: ["Role matrix for workspace admins"],
    },
    {
      title: "Done",
      cards: ["Stripe invoice flow", "Google calendar sync"],
    },
  ];

  return (
    <Frame label="work sphere — northwind / website">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <p>Northwind · Organisation</p>
          <span className="rounded-full bg-[#e7eadc] px-2 py-1">Stripe · Pro</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="rounded-xl bg-[#f3f1e8] p-2">
              <p className="px-1 text-[10px] uppercase tracking-[0.14em] text-olive">
                {column.title}
                <span className="ml-1">{column.cards.length}</span>
              </p>
              <ul className="mt-2 space-y-2">
                {column.cards.map((card) => (
                  <li key={card} className="rounded-lg bg-paper px-2 py-2 text-xs leading-4 shadow-sm">
                    {card}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SpareWaresMock() {
  const parts = [
    ["Brake pad set", "₹1,240"],
    ["Oil filter", "₹320"],
    ["Wheel bearing", "₹890"],
  ];

  return (
    <Frame label="sparewares — orders">
      <div className="grid md:grid-cols-[1fr_12rem]">
        <div className="p-4">
          <div className="flex gap-2 text-[11px]">
            <span className="rounded-full border border-ink/15 px-3 py-1">Search parts…</span>
            <span className="rounded-full bg-[#e7eadc] px-3 py-1">In stock</span>
          </div>
          <ul className="mt-3 divide-y divide-ink/10">
            {parts.map(([name, price]) => (
              <li key={name} className="flex items-center justify-between py-2 text-sm">
                <span>{name}</span>
                <span className="text-olive">{price}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="border-t border-ink/10 p-4 md:border-t-0 md:border-l">
          <p className="text-[10px] uppercase tracking-[0.16em] text-olive">Order SW-441</p>
          <ol className="mt-3 space-y-2 text-xs">
            {["Placed", "Packed", "Shipped", "Out for delivery"].map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${index < 3 ? "bg-moss" : "bg-[#d5d3c6]"}`}
                />
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] text-olive">Socket.io · live</p>
        </aside>
      </div>
    </Frame>
  );
}

const mocks: Record<string, () => React.JSX.Element> = {
  unidigify: UnidigifyMock,
  "scam-detect": ScamDetectMock,
  hrdc: HrdcMock,
  "work-sphere": WorkSphereMock,
  sparewares: SpareWaresMock,
};

export function ProjectMock({ slug }: { slug: string }) {
  const Mock = mocks[slug];
  if (!Mock) return null;
  return <Mock />;
}
