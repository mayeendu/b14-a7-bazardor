import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Product = {
  id: number;
  nameBn: string;
  today: number;
  yesterday: number;
  categoryIcon: string;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data: Product[] = await res.json();

  return (
    <div className="w-full overflow-hidden bg-white text-black mt-1  border-gray-200">
      <MarqueeText direction="right" duration={30} pauseOnHover={true}>
        <div className="flex w-max flex-nowrap items-center gap-8 whitespace-nowrap py-3">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex shrink-0 flex-nowrap items-center gap-2"
            >
              <span> {product.categoryIcon} </span>
              <span>{product.nameBn}</span>

              <span className="font-bold">
                ৳{product.today}/{product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct}%
              </span>

              <div className="w-px bg-gray-200 self-stretch" />
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
