package br.com.formula1.cadastro_piloto.controller;

import br.com.formula1.cadastro_piloto.business.PilotoService;
import br.com.formula1.cadastro_piloto.infrastructure.entitys.PilotoF1;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/piloto")
@RequiredArgsConstructor
public class PilotoController {

    private final PilotoService pilotoService;

    @PostMapping
    public ResponseEntity<Void> salvarPiloto(@RequestBody PilotoF1 piloto) {
        pilotoService.salvar(piloto);
        return ResponseEntity.ok().build();
    }

    // GET
    @GetMapping
    public ResponseEntity<List<PilotoF1>> listarTodos() {
        return ResponseEntity.ok(pilotoService.listarTodos());
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<PilotoF1> buscarPilotoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(pilotoService.buscarPorId(id));
    }

    // GET
    @GetMapping("/nome/{nome}")
    public ResponseEntity<PilotoF1> buscarPilotoPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(pilotoService.buscarPilotoPorNome(nome));
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarPilotoPorId(
            @RequestBody PilotoF1 piloto,
            @PathVariable Integer id) {
        pilotoService.atualizar(id, piloto);
        return ResponseEntity.ok().build();
    }

    // DELETE
    @DeleteMapping("/nome/{nome}")
    public ResponseEntity<Void> deletarPilotoPorNome(@PathVariable String nome) {
        pilotoService.deletarPorNome(nome);
        return ResponseEntity.ok().build();
    }
}