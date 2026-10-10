import { useLocation } from 'react-router';
import Button from '@renderer/shared/ui/Button';
import Modal from '@renderer/shared/ui/Modal';

export default function Files() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <section className="px-4 py-3">
            <div className="flex justify-between items-center mb-6">
                <h2>{path}</h2>

                <div className="flex gap-2">
                    <Button>Add folder</Button>

                    <Button>Add files</Button>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="mb-2">Folders</h2>

                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div
                            key={index}
                            className="bg-panel border-2 border-lines rounded-sm py-2 px-4"
                        >
                            Folder {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h2 className="mb-2">Files</h2>

                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 14 }, (_, index) => (
                        <div
                            key={index}
                            className="bg-panel border-2 border-lines rounded-sm py-2 px-4"
                        >
                            File {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            <Modal>
                <div>Test</div>
            </Modal>
        </section>
    );
}
