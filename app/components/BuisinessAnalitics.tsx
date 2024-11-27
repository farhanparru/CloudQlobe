import StatCard from "./StatCard";

const BuisinessAnalitics = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Career Interconnections"
          value="250+"
          color="#f4821f"
          percentage={75}
          icon="🏆"
        />
        <StatCard
          title="Live Clients"
          value="500+"
          color="#68bd45"
          percentage={60}
          icon="👤"
        />
        <StatCard
          title="Direct Destinations"
          value="50+"
          color="#3498db"
          percentage={60}
          icon="🚩"
        />
      </div>
    </div>
  );
};

export default BuisinessAnalitics;
