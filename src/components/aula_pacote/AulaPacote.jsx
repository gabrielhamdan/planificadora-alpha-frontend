import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function AulaPacote(props) {
    const handleRemove = () => {
        console.log(props.aula.id);
    };

    const handleInputChange = (e, field) => {
        props.onChange(props.aula.id, field, e.target.value);
    };

    return (
        <Row className="mb-3">
            <Col>
                <Form.Label>Status da Aula</Form.Label>
                <Form.Select
                    name="statusAula"
                    value={props.aula.statusAula}
                    className="bg-dark text-white border-light"
                    onChange={(e) => handleInputChange(e, 'statusAula')}
                >
                    <option value="AGENDADA">Agendada</option>
                    <option value="PRESENCA">Presença</option>
                    <option value="FALTA">Falta</option>
                    <option value="CANCELADA">Cancelada</option>
                    <option value="REMARCADA">Remarcada</option>
                </Form.Select>
            </Col>
            <Col>
                <Form.Label>Data</Form.Label>
                <Form.Control
                    type="date"
                    name="data"
                    value={props.aula.data} 
                    className="bg-dark text-white border-light"
                    onChange={(e) => handleInputChange(e, 'data')}
                />
            </Col>
            <Col>
                <Form.Label>Início</Form.Label>
                <Form.Control
                    type="time"
                    name="horaInicial"
                    value={props.aula.horaInicial}
                    className="bg-dark text-white border-light"
                    onChange={(e) => handleInputChange(e, 'horaInicial')}
                />
            </Col>
            <Col>
                <Form.Label>Fim</Form.Label>
                <Form.Control
                    type="time"
                    name="horaFinal"
                    value={props.aula.horaFinal}
                    className="bg-dark text-white border-light"
                    onChange={(e) => handleInputChange(e, 'horaFinal')}
                />
            </Col>
            <Col>
                <Form.Label>Pagamento</Form.Label>
                <p>
                    {props.aula.pagamento ? <FontAwesomeIcon icon={faCheck} /> : '-'}
                </p>
            </Col>
            <Col className="d-flex align-items-end justify-content-start">
                <Button
                    variant="danger"
                    onClick={handleRemove}
                    className="btn-sm"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Col>
        </Row>
    );
}
