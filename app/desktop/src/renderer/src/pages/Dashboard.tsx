import Button from '@renderer/shared/ui/Button';

export default function Dashboard() {
    return (
        <section className="px-4 py-3 grid grid-cols-2 gap-4">
            <div className="bg-panel border-2 border-lines rounded-sm py-2 px-4">
                <h2>Files</h2>
                <p>Total files: 124</p>
                <p>Total bytes: 2.4gb</p>
            </div>
            <div className="bg-panel border-2 border-lines rounded-sm py-2 px-4">
                <h2>Messages</h2>
                <p>Total messages: 24</p>
            </div>
            <div className="bg-panel col-span-2 border-2 border-lines rounded-sm py-2 px-4">
                <h2>Sync</h2>
                <p className="pb-4">Last synced: 28-09 17:46</p>
                <Button>Sync now</Button>
            </div>
        </section>
    );
}
